function periodsResponseToJson(apiResponse) {

    const periods = getElementContent(apiResponse, "Periods");

    return periods;

}

function getElementContent(sourceXml, elementName) {

    const htmlCollection = sourceXml.getElementsByTagName(elementName)[0];
    return handleNode(htmlCollection);

}

function handleNode(element) {

    if (hasChildElementNodes(element)) {

        if (areAllChildrenTheSame(element)) {
            // All child element nodes are the same, an array is expected

            const childrenContentArray = readChildrenContentToArray(element);

            return {
                [element.nodeName]: childrenContentArray
            };

        } else {

            const childrenSummary = readChildrenSummary(element);

            const childrenArray = [...element.childNodes];

            let elContentObj = {};
            const elContentArray = [];

            for (let countedChild in childrenSummary) {

                if (childrenSummary[countedChild] > 1) {
                    // Has siblings with the same name

                    const childContentArray = [];

                    /* 
                        Decided to go with "forEach"+"if" instead of filter because the array will be
                        looped either way
                    */
                    childrenArray.forEach(child => {
                        if (child.nodeName === countedChild) {
                            const childContent = handleNode(child);
                            childContentArray.push(childContent);
                        }
                    })

                    elContentArray.push({
                        [countedChild]: childContentArray
                    });

                } else {
                    // Doesn't have siblings with the same name

                    const child = childrenArray.find(el => el.nodeName === countedChild);
                    const content = handleNode(child);

                    elContentObj = {
                        ...elContentObj,
                        ...content
                    };

                }

            }

            if (elContentArray.length > 0) {

                let returnContent = { ...elContentObj };

                elContentArray.forEach(content => {
                    returnContent = {
                        ...returnContent,
                        ...content
                    }

                })

                return returnContent;

            } else {
                return elContentObj;
            }
        }

    } else {
        return {
            [element.nodeName]: element.textContent
        };
    }

}

function hasChildElementNodes(element) {
    return (element.childElementCount > 0);
}

function areAllChildrenTheSame(element) {

    if (!hasChildElementNodes(element)) {
        return false;
    }

    const childrenArray = [...element.children];

    if (childrenArray.every(child => child.nodeName === element.firstElementChild.nodeName)) {
        return true;
    } else {
        return false;
    }

}

function readChildrenContentToArray(parentElement) {

    const childrenArray = [...parentElement.children];
    const contentArray = [];

    childrenArray.forEach(child => {
        contentArray.push({
            [child.nodeName]: handleNode(child)
        });
    });

    return contentArray;

}

function readChildrenSummary(element) {

    return [...element.children].reduce(
        (acc, cur) => (
            acc[cur.nodeName] = (acc[cur.nodeName] || 0) + 1,
            acc
        )
        , {});

}