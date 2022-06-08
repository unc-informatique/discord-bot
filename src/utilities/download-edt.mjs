/* eslint-disable node/no-extraneous-import */
// import moment from "moment";
import { promises as fs } from "node:fs";
import fetch from "node-fetch";
import craftUrl from "./craft-url.mjs";


async function downloadEdt(path_to_pdf, chiffres_magique, plus = 0) {
    let url = craftUrl(chiffres_magique, plus);

    let resp = await fetch(url);
    
    if (!resp.ok){
      throw new Error("Unexpected response! Not a PDF!");
    }

    if (!resp.headers['Content-Type'] == "application/pdf"){
      throw new Error("Unexpected response! Not a PDF!");
    }
  
    let data = await resp.buffer();
    /*let data = await resp.arrayBuffer();*/

    // fs.writeFileSync(outputFilename, data);
    await fs.writeFile(path_to_pdf, data);
    
    return path_to_pdf;
};


export default downloadEdt;
