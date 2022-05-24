import logger from "../logger.mjs";
import convertUrlToMagic from "../utilities/convert-url-to-magic.mjs";

let url = "https://applis.univ-nc.nc/gedfs/edtweb2/2202041315.6/PDF_EDT_16482_20_2022.pdf?var=1652911829";

logger.debug(convertUrlToMagic(url));
