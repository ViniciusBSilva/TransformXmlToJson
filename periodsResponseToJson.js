function periodsResponseToJson(apiResponse) {

    const periods = getPeriods(apiResponse);

    return periods;

}

function getPeriods(apiResponse) {

    console.clear();

    const periodsElement = apiResponse.getElementsByTagName("Periods")[0];

    return handleNode(periodsElement);

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

function handleNode(element) {

    if (hasChildElementNodes(element)) {

        if (areAllChildrenTheSame(element)) {
            // All child element nodes are the same, an array is expected

            const childrenContentArray = readChildrenContentToArray(element);

            return {
                [element.nodeName]: childrenContentArray
            };

        } else {
            // Not all child element nodes are the same, should handle siblings
            console.log("TODO: Handle this");

            //TODO: read all nodes that have the same name to build the arrays
            //TODO: read all unique nodes to build the object with all
            //TODO: join the object with the arrays using each array name

            /** 
             * Example:
             * 
             * {
             * 
             * node 1: value,
             * node 2: value,
             * array 1: [],
             * array 2: []
             * 
             * }
             * */

            let nodesContentObject = {};

            const childrenArray = [...element.children];

            childrenArray.forEach((child, index) => {

                if (hasSiblingsWithSameName(child, childrenArray)) {

                    // Has nodes with the same name
                    // Filter all to create an array
                    // Remove all from the current array

                    // TODO: handle this
                    console.log("TODO: Handle this");

                } else {

                    // Doesn't have other nodes with the same name 
                    // Handled as individual node

                    const childContent = handleNode(child);

                    nodesContentObject = {
                        ...nodesContentObject,
                        ...childContent
                    };

                    // TODO: Should be removed from the current array?
                    console.log("TODO: Remove node?");

                }

            });

            //TODO:
            // valueToReturn = {
            //     ...nodesContentObject,
            //     ...array
            // };
            // return valueToReturn;

            return nodesContentObject;
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

function hasSiblingsWithSameName(element, parentChildrenArray) {

    const nodesWithSameName = parentChildrenArray.filter(child => {
        return child != element && child.nodeName === element.nodeName;
    });

    if (nodesWithSameName.length > 0) {
        return true;
    } else {
        return false;
    }
}