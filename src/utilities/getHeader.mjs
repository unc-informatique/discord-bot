import moment from "moment";
import patate from "./getConvenientWeek.mjs";


function getHeader(chiffres_magique, plus=0){
    let current_date, num_semaine, url, url_edt;

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


    return ;
}
console.log(patate());
// console.log(getHeader([ '2202041315', '16482', 14 ]));
