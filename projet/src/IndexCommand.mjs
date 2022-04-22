//repertoire de toutes les commandes � faire.

/**
 * La fonction r�cup�re l'emploi du temps en cache et l'envoie dans le channel.
 * Si l'utilisateur n'a pas mis de String role alors l'emploi du temps retourner sera celui correspondant a son r�le � lui (s'il n'a pas de r�le renvoie une erreure).
 * @param {String} role
 * getEdt(String? role)
 **/

/**
 * La fonction supprime les N derniers messages du channel ou la commande a �t� invoquer
 * @param {Integer} n
 * deleteMessage(Integer n)
 **/
/**
 * la fonction supprime les messages ult�rieur � une date
 * @param {Date} date
 * deleteMessage(Date date)
 **/
/**
 * Active ou desactive la mise � jour des emplois du temps automatique
 * @param {Boolean} active
 * switchMajAutoEdt(Boolean active)
 **/

/**
 * La fonction r�cup�re un emploi directement depuis l'api de l'unc, met l'emploi du temps et l'envoie dans le channel
 * @param {String} discipline
 * @param {String} diplome
 * forceUpdateEdt(String discipline, String diplome)
 **/

/**
 * La fonction ajoute une mention dans la base de donn�es
 * Si la mention existe d�j� retourne une erreure
 * @param {String} discipline
 * @param {String} diplome
 * addMention(String discipline, String diplome)
 **/

/**
 * La fonction supprime une mention se trouvant en base de donn�es
 * Si la mention n'existe pas retourne une erreure
 * @param {String} discipline
 * @param {String} diplome
 * deleteMention(String discipline, String diplome)
 **/

/**
 * La fonction ajoute un parcours en base de donn�es
 * Si le parcours existe d�j� retourne une erreure
 * @param {String} discipline
 * @param {String} diplome
 * @param {String} annee
 * @param {String} trec
 * addParcours(String discipline, String diplome,String annee, String trec)
 **/

/**
 * La fonction supprime un parcours en base de donn�es
 * Si le parcours n'existe pas retourne une erreure
 * @param {String} role (repr�sente la concacenation de l'annee et du trec)
 * deleteParcours(String role)
 **/

/**
 * La fonction ajoute un lien entre un emoji et un role
 * Si le role a d�j� un emoji celui ci doit etre remplacer par le nouveau emoji
 * @param {String} role
 * @param {String} code
 * addEmoji(String role, String code)
 **/

/**
 * La fonction supprime le lien qui existe entre un emoji et un role
 * @param {String} role
 * deleteEmoji(String role)
 **/
/**
 * La fonction permet de mettre en �coute un message. Ce message sert de role manager, c�d que les emojis associer a ce message permettrons au utilisateur d'�tre attribu� d'un role.
 * le bot r�cup�rera les differents id du message haut dessus de cette comande dans le channel. (idMessage,idChan,idGuild)
 * listenThisMessage()
 **/
