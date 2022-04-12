# Rétro-conception du `ClassBot` Python

## Liste des fonctionnalités

La liste des fonctionnalités existentes pertinentes pour le projet.

- Commande permettant la liaison d'une emote d'un message à un role.
- Attribution de role à un utilisateur.
- Récupération de l'edt avec convertissement du pdf en image et une mise en cache de l'edt.
- Envoi d'un edt dans un channel.
- Vérification d'un nouvel edt.
- Commande permettant la suppression de N message.
- Affichage d'un message de bienvenu pour les nouveaux arrivant et de depart pour ceux qui partent du serveur.
- Vérification du role de l'utilisateur lors de l'utilisation des commandes dans le bot.

#### Commandes

- ajout/suppression d'une emote a un message relié a un role
- commande edt
- commande pour activer la verification d'edt en tâche de fond
- supprimer des messages selon la quantité donnée

#### Tâche de fond

- vérification de l'edt et des mises a jours

#### Events (listener)

- ajout/suppression d'une émote pour un message
- quand un membre arrive/part du serveur pour les messages d'acceuils
- quand le bot démare

#### Conditions

- vérifier que le membre est dans le staff pour certaines commandes

## Conception

Architecture et fonctionnement du `ClassBot` Python

## Issues

Problèmes et limites du `ClassBot`, actions qui demandent une intervention manuelle, _code smell_ etc.

- [ ] paramétrage, constantes en dur dans le code Python
