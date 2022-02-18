# Projet tuteuré de licence info UNC 2022 `discord-bot`

Projet tuteuré L4 de bot <https://discord.js.org/> pour le serveur Discord de la licence informatique UNC en 2022. Réalisé par :

- <https://github.com/ThePhoenix78>
- <https://github.com/xd390>
- <https://github.com/romulusFR/>

## Fonctionnalités

On reprend les fonctionnalités du `ClassBot` de ThePhoenix78 sur le DD des étudiants.

- [ ] message de bienvenue
- [ ] gestion des rôles
  - [ ] _reaction roles_ pour chaque promo de licence
  - [ ] remise à 0 des rôles
  - [ ] audit des rôles (étudiants qui n'en endossent pas exactement 1)
- [ ] audit des surnoms
  - vérifier que le surnom de chaque membre est bien de la forme _Prénom NOM (Promo)_
- [ ] affichage/téléchargement/lien vers les emplois du temps par promo
  - à voir via le crafting d'url comme dans `ClassBot` ou via le web service UNC d'ics à venir
- [ ] suppression des vieux messages dans les chans
  - à voir

## Critères non fonctionnels

- _state of the art_ JavaScript
  - Node.js 16+
  - ES2019+ <https://node.green/>
- qualité
  - <https://www.conventionalcommits.org/>
  - <https://eslint.org/> _strict_
  - <https://prettier.io/>
  - tests automatisés
    - unitaires
    - intégration/fonctionnels
  - doc
- _production ready_ qualité industrielle
  - logging
  - paramétrage environnement
  - déploiement <https://pm2.keymetrics.io/> sur cible Ubuntu/Debian
