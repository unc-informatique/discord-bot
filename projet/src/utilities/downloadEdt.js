var moment = require('moment');
//const { DownloaderHelper } = require('node-downloader-helper');

const fs = require("fs");
const request = require("request-promise-native");


async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    // console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
}


function downloadEdt(pdf_name, indices = null, plus = 0) {
  var current_date, num_semaine, path_to_pdf, url, url_edt;

  var ts = Date.now();

  var date_time = new Date(ts);

  var day = date_time.getDate();
  var month = date_time.getMonth() + 1;
  var year = date_time.getFullYear();

  var today = day + "-" + month + "-" + year


  var  current_date = moment(today, "DD-MM-YYYY");

  var num_semaine = current_date.week()-1;
  var num_day = current_date.day();

  if (num_day > 5) {
    num_semaine += 1;
  }

  while (num_semaine - indices[2] < 0) {
    num_semaine += 1;
  }

  var ch_magique = num_semaine - indices[2] + plus;

  url = "http://applis.univ-nc.nc/gedfs/edtweb2/" + indices[0] + "." + (ch_magique) + "/PDF_EDT_" + indices[1] + "_"+ (num_semaine + plus) +"_"+ year +".pdf";
  path_to_pdf = "edt/"+pdf_name;

  /*
  const download = new DownloaderHelper(url, __dirname);
  download.on('end', () => console.log('Download Completed'))
  download.start();
  */
  downloadPDF(url, pdf_name);

  return url;
}

console.log(downloadEdt("test.pdf", [2201271126, 15404, 9]))
