# Démo projet de départ

Projet d'exemple avec yarn/eslint/prettier pour la prog async

## ESM et pas CommonJS

Il y a les deux dans Node.js, on va préférer [ESM](https://nodejs.org/api/esm.html) (EcmaScript Module) à [CJS](https://nodejs.org/api/modules.html) (CommonJS, le système historique de Node)

## yarn et pas npm

[Yarn](https://yarnpkg.com/) et [npm](https://docs.npmjs.com/) font à peu près la même chose. On préfèrera Yarn.

- installation des modules actuellement dans le projet
  - `yarn install`
- ajout de modules :
  - `yarn add $MODULE`
  - `yarn add --dev $DEV_MODULE`
- lancement
  `yarn run start`

## Configuration de ESLint

Voir [la doc d'ESLint](https://eslint.org/docs/user-guide/configuring/) et le fichier [json de configuration](.eslintrc.json)

Voir <https://stackoverflow.com/questions/44690308/whats-the-difference-between-prettier-eslint-eslint-plugin-prettier-and-eslint> pour la config d'eslint avec prettier

- `eslint-config-prettier` <https://github.com/prettier/eslint-config-prettier>
- `eslint-plugin-node` <https://www.npmjs.com/package/eslint-plugin-node>
- `eslint-plugin-security` <https://www.npmjs.com/package/eslint-plugin-security>
- `eslint-plugin-import` <https://www.npmjs.com/package/eslint-plugin-import>
- `eslint-plugin-unicorn` <https://www.npmjs.com/package/eslint-plugin-unicorn>

## Configuration Prettier

Voir [la doc](https://prettier.io/docs/en/index.html) et le fichier [json de configuration](.prettierrc)
