/* eslint-disable node/no-extraneous-import */
// import moment from "moment";
import fs from "fs";
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


function downloadEdt(pdf_name, chiffres_magique, plus = 0) {
  let path_to_pdf, url;

  url = craftUrl(chiffres_magique, plus);

  path_to_pdf = "edt/"+pdf_name;

  downloadPDF(url, pdf_name);

  return path_to_pdf;
}


// console.log(downloadEdt("test.pdf", [2201271126, 15404, 9]));
export default downloadEdt;
