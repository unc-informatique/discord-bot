# Architecture du bot

Ici l'outillage et les principales bibliothèques en plus de <https://discord.js.org/>.

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
- [ ] _database_, à voir selon le besoin entre :
  - [ ] sqlite3 <https://github.com/mapbox/node-sqlite3> (async) / ~~better-sqlite3 <https://github.com/JoshuaWise/better-sqlite3> (sync)~~
  - [ ] postgres <https://node-postgres.com/>
  - [ ] Knex <https://knexjs.org/> (_query builder_)
  - [ ] Sequelize <https://sequelize.org/> (ORM)
  - [ ] ~~KeyV <https://keyv.js.org/#/> un key-value store qui peut utiliser les précédents en backend.~~
    - l'API est cool mais le schéma de persistence est très bof
  - [ ] ~~MongoBD~~
    - le projet n'est plus FLOSS
