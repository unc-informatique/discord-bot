import logger from "../logger.mjs";
/**\
 * @param {PrismaClient} prisma 
 * @param {CommandInteraction} interaction
 * @param {String} messageReponse
 * @param {function} foo
 */
export function connexion(prisma, interaction, messageReponse, foo){
    try {
        foo();
    } catch (error) {
      logger.error(error, `Command handling error (${error.message})`);
      return interaction.editReply({content:`Command handling error (${error.message})`,ephemeral:true});
    } finally {
      prisma.$disconnect();
    }
      return interaction.editReply(messageReponse);
    };