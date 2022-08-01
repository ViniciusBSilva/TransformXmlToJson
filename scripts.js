function onloadBody() {

    const sourceFileInput = document.getElementById("SourceFile");

    sourceFileInput.addEventListener('loadstart', eventSetFileName);
    sourceFileInput.addEventListener('change', eventSetFileName);

    setFileName(getSourceFileName());

} // onloadBody

function setFileName(sourceFileName) {
    const fileNameInput = document.getElementById("TargetFile");
    fileNameInput.value = `${sourceFileName}.json`;
} // setFileName

function eventSetFileName() {
    setFileName(getSourceFileName());
} // eventSetFileName

function getSourceFileName() {
    const sourceFileInput = document.getElementById("SourceFile");
    const sourceFileName = sourceFileInput.value.split(".")[0];
    return sourceFileName;
}

function transformAndDownload() {

    const sourceXmlPath = document.getElementById("SourceFile").value;
    const sourceXml = loadXMLDoc(sourceXmlPath);

    let output = "";

    switch (sourceXmlPath) {
        case "MessageOverviewResponse.xml":
            output = messageOverviewResponseToJson(sourceXml);
            break;
        case "PeriodsResponse.xml":
            output = periodsResponseToJson(sourceXml);
            break;
        default:
    }
    console.log(output);

    const resultString = JSON.stringify(output);

    if (document.getElementById("DownloadFile").checked) {

        downloadFile(resultString);

    } else {
        // Test only
        document.getElementById("Preview").classList.remove("hide");
        document.getElementById("Output").value = resultString;
    }

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