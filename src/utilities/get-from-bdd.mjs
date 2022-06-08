import pkg from "@prisma/client";
import { connexion } from ".connexion-bdd.mjs";
import logger from "../logger.mjs";


async function getChiffresMagiqueFromBdd(diplome){
    const { PrismaClient } = pkg;
    const prisma = new PrismaClient();

    try {
      await prisma.$connect();
      const parcours = await prisma.parcours.findMany({
        where: {
          discipline : diplome,
          diplome : discipline
        },
        select: {
          emoji : true,
          role : true,
        }
      });
      for(const key in parcours){
         console.log(key);
      }

      
    } catch (error) {
        logger.error(error, `Command handling error (${error.message})`);
    } finally {
         prisma.$disconnect();
    }
}


async function get(){

}

export { getChiffresMagiqueFromBdd };