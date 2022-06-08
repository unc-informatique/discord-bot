import getFromBdd from ".get-from-bdd.mjs";
import getPdfInfo from ".get-pdf-info.mjs";
import downloadEdt from ".download-edt.mjs";


function compareHeaders(headers1, headers2) {
    return headers1["etag"] == headers2["etag"];
}



function checkPdfAndDownload(licence){

    // on récupère les infos relatives a la licence
    let oldData = getChiffresMagiqueFromBdd(licence);

    // récupère les chiffres magiques relatif a la promo
    let chiffresMagique = getBddChiffresMagique(licence);

    let data = getPdfInfo(chiffresMagiques);

    if (compareHeaders(data, oldData)){
        // on sauvegarde les données et on télécharge le pdf
        data.save();
        downloadEdt(destination, chiffresMagiques);
    }
}


export default checkPdfAndDownload;