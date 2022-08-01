function periodsResponseToJson(apiResponse) {

    const periods = getPeriods(apiResponse);

    return periods;

}

function getPeriods(apiResponse) {

    const periodsNodeCollection = [...apiResponse.getElementsByTagName("Periods")];

    return readChildren(periodsNodeCollection);

}

function readChildren(nodeCollection) {

    console.log("nodeCollection", nodeCollection);
    console.log("nodeCollection.length", nodeCollection.length);

    let children = {};

    if (nodeCollection.length && nodeCollection.length > 0) {

        // [...nodeCollection].forEach(child => {
        //     console.log("child", child);

        //     if (child.children.length && child.children.length > 0) {
        //         let childrenNodeCollection = readChildren(child.children);
        //         childrenNodeCollection = {
        //             ...childrenNodeCollection,
        //             [child.nodeName]: childrenNodeCollection
        //         };
        //     } else {
        //         children = {
        //             ...children,
        //             [child.nodeName]: child.textContent
        //         };
        //     }
        // });

        if (nodeCollection.length > 1) {

            nodeCollection.forEach(element => {

            });

        } else {

            const children = readChildren(nodeCollection[0]);

            children = {
                [nodeCollection[0].nodeName]: children
            };

        }


    } else {

        children = {
            ...children,
            [nodeCollection.nodeName]: nodeCollection.textContent
        };

    }

    return children;

}