# Architecture du bot

Ici l'outillage et les principales bibliothèques en plus de <https://discord.js.org/>.

## Choix techniques

Principaux choix (coché quand déterminé) :

- _state of the art_ JavaScript
  - [x] Node.js 17 <https://nodejs.org/en/>
    - API Promise et `async/await`
  - [x] ES2021+ <https://node.green/>
  - [x] Yarn <https://yarnpkg.com/>
- bonnes pratiques
  - [x] <https://github.com/goldbergyoni/nodebestpractices>
- gestion du développement
  - [x] GitHub <https://github.com/unc-informatique/discord-bot>
  - [x] Respecter <https://www.conventionalcommits.org/> (voir aussi [cette doc](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716))
- _tooling_ JavaScript
  - [x] <https://code.visualstudio.com/> avec extensions minimales
  - [x] linting <https://eslint.org/>
    - [x] configuré _strict_ avec [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
    - [x] extension VSCode [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [ ] style AirBnB <https://airbnb.io/javascript/>
  - [x] <https://prettier.io/> pour l'auto formatage
    - [x] extension VSCode [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [ ] tests automatisés (unitaires, intégration, fonctionnels)
    - [ ] <https://jestjs.io/> pour l'unitaire
    - [ ] <https://cordejs.org/> pour le E2E
  - [ ] JSDoc <https://jsdoc.app/>
- gestion de versions
  - [ ] Git Hooks <https://githooks.com/> **TODO à la racine du repo**
    - voir <https://prettier.io/docs/en/precommit.html> pour Prettier
    - [x] <https://typicode.github.io/husky/#/> (intégré via lint-staged)
    - [x] <https://github.com/okonet/lint-staged>
      - à installer via `npx mrm lint-staged`
      - vérifier le point des hooks avec `git config core.hooksPath`
  - [ ] Discipline de commits <https://commitlint.js.org/>
  - [ ] CI/CD pour le déploiement automatique
  - [ ] gestion de la branche master pour la prod seulement
  - [ ] gestion des versions/tags du bot, via `yarn version`
  - [ ] générateur de `CHANGELOG` à partir des commits standardisés, e.g. <https://github.com/CookPete/auto-changelog>
- _production ready_
  - [x] cible VM OVH Ubuntu 21.10.
  - [x] `NODE_ENV=production` _versus_ `NODE_ENV=development`
  - [x] logging <https://github.com/pinojs/pino>
  - [x] environnement `dotenv` <https://github.com/motdotla/dotenv>
    - extension VSCode [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
  - [x] déploiement <https://pm2.keymetrics.io/>
- [x] _database_, à voir selon le besoin entre :
  - [x] Prisma <https://www.prisma.io/docs/>
  - [ ] sqlite3 <https://github.com/mapbox/node-sqlite3> (async) / ~~better-sqlite3 <https://github.com/JoshuaWise/better-sqlite3> (sync)~~
  - [ ] postgres <https://node-postgres.com/>
  - [ ] Knex <https://knexjs.org/> (_query builder_)
  - [ ] Sequelize <https://sequelize.org/> (ORM)
  - [ ] ~~KeyV <https://keyv.js.org/#/> un key-value store qui peut utiliser les précédents en backend.~~
    - l'API est cool mais le schéma de persistence est très bof
  - [ ] ~~MongoBD~~
    - le projet n'est plus FLOSS

## Fonctionnalités du bot

Liste spéculative à consolider, reprises en tout ou partie du `ClassBot`.

- [x] commandes `ping`, `uptime` et `version`
- [x] être capable de gérer plusieurs formations
- [x] message de bienvenue
- [X] gestion des rôles
  - [x] _reaction roles_ pour chaque promo de licence
  - [ ] remise à 0 des rôles
  - [ ] audit des rôles (étudiants qui n'en endossent pas exactement 1)
- [ ] audit des surnoms
  - vérifier que le surnom de chaque membre est bien de la forme _Prénom NOM (Promo)_
- [ ] affichage/téléchargement/lien vers les emplois du temps par promo
  - à voir via le crafting d'url comme dans `ClassBot` ou via le web service UNC d'ics à venir
- [ ] suppression des vieux messages dans les chans
  - à voir..., et le cas échéant être très strict sur les tests
- [ ] contacts admin ?
- [ ] Vérification de s'il y a un nouvel emploi du temps
  - peut être une vérification en binaire
- [X] Récupération de l'emploi du temps avec convertissement du pdf en image
  - [X] possibilité de mise en cache
- [ ] Commandes
  - [ ] Affichage d'un emploi du temps en fonction du role de l'utilisateur
  - [X] Suppression des messages plus anciens qu'une date X
  - [X] Laison d'un emoji à un rôle sur un message
  - [ ] Désactivation de la mise à jour/vérification des emplois du temps
- [X] Vérification des permissions des utilisateurs pour l'utilisation du bot
- [ ] sondage
  - un utilisateur peut crée un message qui fera office de sondage avec des reactions pour les choix des utilisateurs.

## Modèle conceptuel de données

Lien édition vers la source : <https://lucid.app/lucidchart/f0928b94-a70b-4f56-8ba2-f98757a8637c/edit?invitationId=inv_618ae085-f6bb-442b-b5ff-41b830d92274>

Rendu final, voir [le schéma](Schema_BotDiscord.pdf).
