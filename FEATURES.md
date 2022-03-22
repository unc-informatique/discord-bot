# Fonctionnalités du bot

Liste spéculative à consolider, reprises en tout ou partie du `ClassBot`.

- [x] commandes `ping`, `uptime` et `version`
- [x] être capable de gérer plusieurs formations
- [x] message de bienvenue
- [ ] gestion des rôles
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
- [ ] Récupération de l'emploi du temps avec convertissement du pdf en image 
  - [ ] possibilité de mise en cache
- [ ] Commandes
  - [ ] Affichage d'un emploi du temps en fonction du role de l'utilisateur
  - [ ] Suppression des messages plus anciens qu'une date X
  - [ ] Laison d'un emoji à un rôle sur un message
  - [ ] Désactivation de la mise à jour/vérification des emplois du temps
- [ ] Vérification des permissions des utilisateurs pour l'utilisation du bot
- [ ] sondage
  - un utilisateur peut crée un message qui fera office de sondage avec des reactions pour les choix des utilisateurs.