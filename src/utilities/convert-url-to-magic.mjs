import moment from "moment";
import getConvenientWeek from "./get-convenient-week.mjs";


function convertUrlToMagic(url) {
  let current_date, num_semaine;

  let check_valid = url.split("/").includes("edtweb2");
  if (!check_valid){
      return
  }
  let explode = url.split("/");
  explode = explode.splice(explode.indexOf('edtweb2'), 3).splice(1, 2);

  let part1 = explode[0].split(".");
  let part2 = explode[1].split("_").splice(2, 2);

  let chiff_magic1 = part1[0];
  let chiff_magic2 = part2[0];

  let chiffre_temporaire = part2[1];
  let resultat_attendu = part1[1];

  num_semaine = getConvenientWeek();;

  if (num_semaine - chiffre_temporaire < 0){
      console.log("Impossible");
      return
  }
  let chiff_magic3 = chiffre_temporaire - resultat_attendu;

  let chiffres_magique = [chiff_magic1, chiff_magic2, chiff_magic3];
  return chiffres_magique;
}

// console.log(convertUrlToMagic("//applis.univ-nc.nc/gedfs/edtweb2/2202041315.4/PDF_EDT_16482_18_2022.pdf?var=1651354258"));

export default convertUrlToMagic;
