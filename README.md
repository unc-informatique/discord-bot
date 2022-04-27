# Projet tuteuré de licence info UNC 2022 `discord-bot`

Projet tuteuré L4 de bot <https://discord.js.org/> pour le serveur Discord de la licence informatique UNC en 2022.

Réalisé par :

- <https://github.com/ThePhoenix78>
- <https://github.com/xd390>
- <https://github.com/romulusFR/>

Voir les fichiers :

- [LEGACY.md](LEGACY.md) pour la reprise de l'existant
- [ARCHITECTURE.md](ARCHITECTURE.md) pour les outils techniques et le déploiement en prod
- [FEATURES.md](FEATURES.md) pour la liste des fonctionnalités

Le projet commence semaine 08 et se termine par la soutenance et la remise des livrable finaux semaine 22.
On note les actions réalisées sur les 15 semaines (<https://www.epochconverter.com/fr/semaines/2022>).

## TODO

- [x] trouver un bot discord.js libre et bien écrit mais pas torp compliqué pour s'en inspirer
  - <https://airhorn.solutions/> <https://github.com/discord/airhornbot>
  - <https://github.com/bpbuch/discord-role-bot> pas top qualité mais reaction minimaliste
- [ ] noter la liste des permissions / code binaire et **garder le lien**
  - attention il y a _scope OAuth2_ et _permission dans le server_ qui sont différent !
- [x] rétro concevoir le bot Python du `ClassBot` de <https://github.com/ThePhoenix78>
  - [ ] todo/issues qu'il faudrait corriger
  - [x] fixer une liste des fonctionnalités
- [x] évaluer le besoin d'une BD ou d'un KV et concevoir son schéma le cas échéant
- [ ] migrer projet de départ à la racine
