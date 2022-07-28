function transformAndDownload() {

    const sourceXmlPath = document.getElementById("SourceFile").value;
    const sourceXml = loadXMLDoc(sourceXmlPath);

    const resultNode = getResultNodeContent(sourceXml);
    console.log("resultNode", resultNode);

    const dataNode = getDataNodeContent(sourceXml);


    const output = {
        ...resultNode,
        ...dataNode
    }
    console.log(output);

    const resultString = JSON.stringify(output);

    if (document.getElementById("DownloadFile").checked) {

        downloadFile(resultString);

    } else {
        // Test only
        document.getElementById("Preview").style.display = "";
        document.getElementById("Output").value = resultString;
    }

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
                    [columnNames[i]]: child.textContent,
                }
                i++;
            }
        });

        dataNode["Data"].push(dataNodeRow);

    });

    return dataNode;
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

function downloadFile(stringContent) {

    const targetFilename = document.getElementById("TargetFile").value;
    download(targetFilename, stringContent);

}

function download(filename, stringContent) {

    var element = document.createElement("a");

    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(stringContent));
    element.setAttribute("download", filename);
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

}

function loadXMLDoc(filename) {

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", filename, false);

    try {
        xhttp.resposeType = "msxml-document";
    } catch (err) {

    }

    xhttp.send("");
    return xhttp.responseXML;

}