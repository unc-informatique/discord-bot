import craftUrl from "./craft-url.mjs";
// eslint-disable-next-line node/no-extraneous-import
import fetch from "node-fetch";


async function getPdfInfo(chiffres_magique, plus=0) {
    let url = craftUrl(chiffres_magique, plus);

    let resp = await fetch(url, {method: "HEAD"});

    if (!resp.ok){
      throw new Error("Unexpected response! " + resp.statusText);
    }

    if (!resp.headers.get('Content-Type') == "application/pdf"){
      throw new Error("Unexpected response! Not a PDF!");
    }
  
    let head = resp.headers

   return {"size": head.get("Content-Length"), "etag": head.get("ETag"), "date": head.get("Last-Modified")};
};


export default getPdfInfo;
