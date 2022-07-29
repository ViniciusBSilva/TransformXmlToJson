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

        row.childNodes.forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                dataNodeRow = {
                    ...dataNodeRow,
                    [columnNames[i]]: handleEmptyValues(columnNames[i], child.textContent),
                }
                i++;
            }
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

    sourceXml.getElementsByTagName("ColumnNames")[0].childNodes.forEach(element => {
        if (element.nodeType === Node.ELEMENT_NODE) {
            columnNames = {
                ...columnNames,
                [i++]: element.textContent.replace(/\s+/g, '')
            }
        }
    });

    return columnNames;

}

function getResultNodeContent(sourceXml) {

    let resultJson = {
        "Result": {}
    };

    sourceXml.getElementsByTagName("Result")[0].childNodes.forEach(element => {
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