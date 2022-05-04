import moment from "moment";
import fs from "fs";
import fetch from "node-fetch";


async function downloadPDF(pdfURL, outputFilename) {
    let resp = await fetch(pdfURL);
    // if (!resp.ok) throw new Error("Unexpected response");
    let data = await resp.buffer();
    /*let data = await resp.arrayBuffer();*/

    fs.writeFileSync(outputFilename, data);
}


function downloadEdt(pdf_name, chiffres_magique, plus = 0) {
  let current_date, num_semaine, path_to_pdf, url, url_edt;

  //let ts = Date.now();

  let date_time = new Date();

  let day = date_time.getDate();
  let month = date_time.getMonth() + 1;
  let year = date_time.getFullYear();

  current_date = moment(day+"-"+month+"-"+year, "DD-MM-YYYY");

  num_semaine = current_date.week()-1;
  let num_day = current_date.day();

  if (num_day > 5) {
    num_semaine += 1;
  }

  while (num_semaine - chiffres_magique[2] < 0) {
    num_semaine += 1;
  }

  let ch_magique = num_semaine - chiffres_magique[2] + plus;

  url = "http://applis.univ-nc.nc/gedfs/edtweb2/" + chiffres_magique[0] + "." + (ch_magique) + "/PDF_EDT_" + chiffres_magique[1] + "_"+ (num_semaine + plus) +"_"+ year +".pdf";
  path_to_pdf = "edt/"+pdf_name;

  downloadPDF(url, pdf_name);

  return url;
}

console.log(downloadEdt("test.pdf", [2201271126, 15404, 9]))
