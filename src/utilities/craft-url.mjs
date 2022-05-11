import moment from "moment";
import getConvenientWeek from "./get-convenient-week.mjs";


function craftUrl(magic_parameters, offset = 0) {
    let [id_1, id_2, delta_week] = magic_parameters;

    const today = moment();
    /*
    let day_number = today.day();

    // on passe à la semaine d'après si on est en fin de l'actuelle;
    if (day_number > 5);
        day_number += 1;

    // on fait le sordide calcul du delta de semaines;
    const week_number = today.week() - 1;
    */
    const week_number = getConvenientWeek();

    const magic_number = week_number >= delta_week ? week_number - delta_week + offset : 0 + offset;

    logger.debug(
    // console.log(
        `week_number = ${week_number}; delta_week = ${delta_week}; offset = ${offset},  magic_number = ${magic_number}`,
    );

    const url = `http://applis.univ-nc.nc/gedfs/edtweb2/${id_1}.${magic_number}/PDF_EDT_${id_2}_${
        week_number + offset
    }_${today.year()}.pdf`;

    return url;
}

// console.log(craftUrl([12345, 125, 2]))
export default craftUrl;
