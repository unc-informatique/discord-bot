/* eslint-disable node/no-extraneous-import */
// import moment from "moment";
import fs from "node:fs";
import fetch from "node-fetch";
import craftUrl from "./craft-url.mjs";

async function downloadPDF(pdfURL, outputFilename) {;
    let resp = await fetch(pdfURL);
    
    if (!resp.ok){
      throw new Error("Unexpected response! Not a PDF!");
    }

    if (!resp.headers['Content-Type'] == "application/pdf"){
      throw new Error("Unexpected response! Not a PDF!");
    }
  
    let data = await resp.buffer();
    /*let data = await resp.arrayBuffer();*/

    fs.writeFileSync(outputFilename, data);
};


function downloadEdt(path_to_pdf, chiffres_magique, plus = 0) {
  let url = craftUrl(chiffres_magique, plus);

  downloadPDF(url, path_to_pdf);

  return path_to_pdf;
}


export default downloadEdt;
