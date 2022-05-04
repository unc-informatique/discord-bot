import moment from "moment";


function getIsoDateWeek(){
    let date_time = new Date();

    let day = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

    let current_date = moment(day+"-"+month+"-"+year, "DD-MM-YYYY");

    let num_semaine = current_date.week()-1;
    let num_day = current_date.day();

    if (num_day > 5) {
      num_semaine += 1;
    }

    return num_semaine;
}


//console.log(getIsoDateWeek());
