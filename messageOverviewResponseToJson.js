function messageOverviewResponseToJson(apiResponse) {

    const resultNode = getResultNodeContent(apiResponse);
    const dataNode = getDataNodeContent(apiResponse);

    const jsonOutput = {
        ...resultNode,
        ...dataNode
    }

    return jsonOutput;

}

function getDataNodeContent(sourceXml) {

    const columnNames = getDataColumnNames(sourceXml);

    let dataNode = {
        "Data": []
    };

    const rowNodes = [...sourceXml.getElementsByTagName("Row")];

    rowNodes.forEach(row => {

        let dataNodeRow = {};
        let i = 0;

        const childrenArray = [...row.children];
        childrenArray.forEach(child => {
            dataNodeRow = {
                ...dataNodeRow,
                [columnNames[i]]: handleEmptyValues(columnNames[i], child.textContent),
            }
            i++;
        });

        dataNode["Data"].push(dataNodeRow);

    });

    return dataNode;
}

function handleEmptyValues(columnName, value) {
    if (columnName === "Error" ||
        columnName === "Scheduled" ||
        columnName === "Successful" ||
        columnName === "Terminatedwitherror") {

        return value === "-" ? 0 : value;

    }
    else {
        return value === "-" ? "" : value;
    }

}

function getDataColumnNames(sourceXml) {

    let columnNames = {};
    let i = 0;

    const columnNamesElement = sourceXml.getElementsByTagName("ColumnNames")[0];
    const childrenArray = [...columnNamesElement.children];

    childrenArray.forEach(element => {
        columnNames = {
            ...columnNames,
            [i++]: element.textContent.replace(/\s+/g, '')
        }
    });

    return columnNames;

}
function getResultNodeContent(sourceXml) {

    let resultJson = {
        "Result": {}
    };

    const resultElement = sourceXml.getElementsByTagName("Result")[0];
    const childrenArray = [...resultElement.children];

    childrenArray.forEach(element => {
        if (element.nodeType === Node.ELEMENT_NODE) {
            resultJson["Result"] =
            {
                ...resultJson["Result"],
                [element.nodeName]: element.textContent
            };
        }
    });

    return resultJson;
}