# Projet DAB — Distributeur Automatique de Billets (exercice)

Petit projet pédagogique qui simule un DAB simplifié dans le navigateur. L'objectif est de transformer la logique d'un algorithme en interface web (HTML/CSS/JS) et d'illustrer l'utilisation du LocalStorage pour persister des comptes.

## Vue d'ensemble

Le projet propose une interface minimale pour :

- sélectionner un compte existant
- s'authentifier avec un PIN (prompt)
- consulter le solde
- effectuer des dépôts et des retraits
- consulter l'historique des dernières opérations

Les comptes sont stockés dans le LocalStorage du navigateur sous la clé `dab_account`.

## Contrat (inputs / outputs)

- Entrées :
	- sélection d'un compte (menu déroulant)
	- saisie du PIN via `prompt()`
	- montants pour dépôt/retrait via `prompt()`
- Sorties :
	- alertes et messages (solde, erreurs)
	- mise à jour de l'interface (solde, historique)
	- persistance : LocalStorage (JSON)

## Technologies & documentation

- ![HTML5](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg) HTML — MDN (FR) : [https://developer.mozilla.org/fr/docs/Web/HTML](https://developer.mozilla.org/fr/docs/Web/HTML)
- ![CSS3](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg) CSS — MDN (FR) : [https://developer.mozilla.org/fr/docs/Web/CSS](https://developer.mozilla.org/fr/docs/Web/CSS)
- ![JavaScript](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg) JavaScript — MDN (FR) : [https://developer.mozilla.org/fr/docs/Web/JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)

## Structure du projet

- `index.html` — interface et éléments DOM (sélecteur de compte, boutons d'opérations, section session/historique).
- `style.css` — styles simples pour la carte, boutons et listes.
- `script.js` — logique : gestion des comptes, LocalStorage, UI events, opérations (dépôt/retrait), historique.

## Comptes par défaut

Le projet initialise deux comptes par défaut (si aucun `dab_account` en LocalStorage) :

- Dupont — PIN `1234` — solde initial : 500
- Durand — PIN `0000` — solde initial : 1500

Ces PINs apparaissent dans les invites (pour faciliter l'exercice). Ne pas utiliser ces valeurs en production.

## Utilisation rapide

1. Ouvrez `index.html` dans votre navigateur.
2. Choisissez un compte, cliquez sur "Insérer la carte" et entrez le PIN (ex. `1234`).
3. Utilisez les boutons : "Voir solde", "Retirer", "Déposer", "Déconnexion".
4. Les opérations mettent à jour le solde et l'historique ; les données sont sauvegardées dans le LocalStorage.

## Notes d'implémentation importantes

- LocalStorage : la clé utilisée est `dab_account`. Le script tente de parser les données et gère les erreurs de parsing.
- Validation : les montants doivent être supérieurs à 0 et inférieurs ou égaux au solde pour les retraits.
- Historique : les opérations sont ajoutées en tête du tableau (`unshift`) et affichées (jusqu'aux 10 premières).
- UI : l'authentification utilise `prompt()` (intéressant pour un exercice, mais à remplacer par un formulaire sécurisé pour une vraie application).

## Améliorations possibles

- Remplacer `prompt()` par un formulaire/modal sécurisé pour saisir le PIN et les montants.
- Ajouter gestion des erreurs plus détaillée et messages inline (au lieu d'alertes).
- Tests unitaires pour la logique (fonctions de dépôt/retrait, validation).
- Internationalisation / textes séparés dans un fichier de ressources.
- Ajouter des badges (Shields) et une capture d'écran d'aperçu dans le README.

## Exemple (données)

PIN d'exemple :

```bash
1234
```

## Contribution

1. Forkez le dépôt
2. Créez une branche feature/x
3. Ouvrez une Pull Request

Merci de garder les changements simples et bien commentés.

---

Si vous voulez que je :

- ajoute des badges (Shields.io) en haut du README,
- insère une capture d'écran ou un GIF d'aperçu,
- améliore le contenu technique (par ex. remplacer prompt par modal),

je peux l'ajouter tout de suite. Dites-moi ce que vous préférez.
