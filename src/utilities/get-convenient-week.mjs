import moment from "moment";

function getConvenientWeek(){
    const today = moment();
    let day_number = today.day();

    // on passe à la semaine d'après si on est en fin de l'actuelle;
    if (day_number > 5);
        day_number += 1;

    // on fait le sordide calcul du delta de semaines;
    let week_number = today.week() - 1;

    return week_number;
}

export default getConvenientWeek;
