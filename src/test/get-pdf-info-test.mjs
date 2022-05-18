import logger from "../logger.mjs";
import getPdfInfo from "../utilities/get-pdf-info.mjs";


let test = await getPdfInfo([ '2202041315', '16482', 14 ]);
logger.debug(test["etag"]);
logger.debug(test);