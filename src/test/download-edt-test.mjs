import logger from "../logger.mjs";
import downloadEdt from "../utilities/download-edt.mjs";


logger.debug(downloadEdt("test.pdf", ['2202041315', '16482', 14]));