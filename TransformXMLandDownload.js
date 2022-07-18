function transformAndDownload() {

    const originalXMLPath = document.getElementById("SourceFile").value;
    const transformXSLPath = document.getElementById("XSLFile").value;

    const originalXML = loadXMLDoc(originalXMLPath);
    const transformXSL = loadXMLDoc(transformXSLPath);

    // code for Chrome, Firefox, Opera, etc.
    if (document.implementation && document.implementation.createDocument) {

        const xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(transformXSL);

        // const resultDocument = xsltProcessor.transformToFragment(originalXML, document);
        const resultDocument = xsltProcessor.transformToDocument(originalXML);

        const resultString = new XMLSerializer().serializeToString(resultDocument.documentElement);

        const downloadFile = document.getElementById("DownloadFile").checked;

        if (downloadFile) {

            downloadXML(resultString);

        } else {
            // Test only
            const elPreview = document.getElementById("Preview").style.display = "";
            const elResult = document.getElementById("Result").value = resultString;
        }

    }

}

function downloadXML(stringContent) {

    const targetFilename = document.getElementById("TargetFile").value;
    download(targetFilename, stringContent);

}

function download( filename, stringContent ) {
    var element = document.createElement( "a" );
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(stringContent));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild( element );

    element.click();

    document.body.removeChild( element );

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