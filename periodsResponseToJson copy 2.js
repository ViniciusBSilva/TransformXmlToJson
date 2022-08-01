function periodsResponseToJson(apiResponse) {

    const periods = getPeriods(apiResponse);

    return periods;

}

function getPeriods(apiResponse) {

    console.clear();

    const periodsNode = apiResponse.getElementsByTagName("Periods")[0];

    return readChildren(periodsNode);

}

function readChildren(node) {

    console.groupEnd();
    console.group();

    console.groupCollapsed("Trace");
    console.trace();
    console.groupEnd();

    // Create an array from the node input (or just use it if it's already an array)
    const nodeArray = Array.isArray(node) ? node : [node];

    console.log("nodeCollection", nodeArray);
    console.log("nodeCollection.length", nodeArray.length);

    if (nodeArray.length > 1) {

        const childrenArray = [];
        let childrenObj = {};

        [...nodeArray].forEach(element => {

            if (element.childElementCount > 0) {

                // const childrenNodes = readChildren([...element.children]);

                childrenArray.push({
                    [element.nodeName]: "childrenNodes"
                });


            } else {
                childrenObj = {
                    ...childrenObj,
                    [element.nodeName]: element.textContent
                };
            }

        });

        if (childrenArray.length > 0) {
            childrenObj = {
                ...childrenObj,
                childrenArray
            }
        }

        console.groupEnd();
        return childrenObj;

    } else {

        return handleNode(nodeArray);

    }
}

function handleNode(nodeArray) {

    const element = nodeArray[0];

    const childrenArray = [...element.children];

    if (childrenArray.every(child => child.nodeName === element.firstElementChild.nodeName)) {
        // All child element nodes are the same, an array is expected

        const childrenContentArray = readChildrenContentToArray(element);

        return {
            [element.nodeName]: childrenContentArray
        };

    } else {
        // Not all child element nodes are the same, should handle siblings
        console.log("TODO: Handle this");
    }

}

function readChildrenContentToArray(parentElement) {

    const childrenArray = [...parentElement.children];

    const contentArray = [];

    childrenArray.forEach(child => {

        contentArray.push({
            [child.nodeName]: "childrenNodes"
        });

    });

    return contentArray;

}
