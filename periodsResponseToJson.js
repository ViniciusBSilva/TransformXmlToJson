function periodsResponseToJson(apiResponse) {

    const periods = getPeriods(apiResponse);

    return periods;

}

function getPeriods(apiResponse) {

    const periodNodes = [...apiResponse.getElementsByTagName("Period")];

    const periods = {
        "Periods": []
    };

    periodNodes.forEach(periodNode => {

        const period = {
            "Period": readChildren(periodNode.children)
        }
        periods["Periods"].push(period);

    });

    return periods;
}

function readChildren(nodeCollection) {

    console.log("nodeCollection", nodeCollection);
    console.log("nodeCollection.length", nodeCollection.length);

    const childrenArray = [];

    if (nodeCollection.length > 0) {

        [...nodeCollection].forEach(child => {
            console.log("child", child);

            if (child.children.length > 0) {
                const children = readChildren(child.children);
                childrenArray.push({
                    [child.nodeName]: children
                });
            } else {
                childrenArray.push({
                    [child.nodeName]: child.textContent
                });
            }
        });

    } else {

        childrenArray.push({
            [nodeCollection.nodeName]: nodeCollection.textContent
        });

    }

    return childrenArray;

}