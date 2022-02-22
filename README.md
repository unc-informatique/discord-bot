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

## Qualité logicielle

Ici l'outillage et les principales bibliothèques en plus de <https://discord.js.org/>.
Voir le [README.md](demos/starter/README.md) du projet de départ `starter` pour un exemple en cours et les fichiers de configuration dans le même dossier.

Principaux choix (coché quand déterminé) :

- _state of the art_ JavaScript
  - [X] Node.js 17 <https://nodejs.org/en/>
    - API Promise et `async/await`
  - [X] ES2021+ <https://node.green/>
  - [X] Yarn <https://yarnpkg.com/>
- bonnes pratiques
  - [X] <https://github.com/goldbergyoni/nodebestpractices>
- gestion du développement
  - [X] GitHub <https://github.com/unc-informatique/discord-bot>
  - [ ] respecter <https://www.conventionalcommits.org/> (voir aussi [cette doc](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716))
- _tooling_
  - [X] <https://code.visualstudio.com/> avec extensions minimales
    - [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [X] <https://eslint.org/>
    - configuré _strict_ avec [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
  - [X] <https://prettier.io/> pour l'auto formatage
  - [ ] tests automatisés <https://jestjs.io/>
    - unitaires
    - intégration/fonctionnels
  - [ ] conventions JSDoc <https://jsdoc.app/>
- _production ready_
  - cible VM OVH Ubuntu 21.10. Uniquement les ports _web_ ouverts
  - [ ] `NODE_ENV=production` _versus_ `NODE_ENV=development`
  - [X] logging <https://github.com/pinojs/pino>
  - [X] environnement `dotenv` <https://github.com/motdotla/dotenv>
  - [ ] déploiement <https://pm2.keymetrics.io/>
