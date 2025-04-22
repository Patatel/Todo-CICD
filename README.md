# Projet de Todo List Connectée

## Description
Ce projet est une application de todo list simple et connectée. Il est composé de trois parties principales :
backend/ : mini API REST avec Express.js
iot-script/ : script Node.js qui collecte les données du PC (CPU, RAM, réseau, Bluetooth)
frontend/ : interface React avec Expo pour consulter les données en temps réel


## Prérequis
Node.js installé sur votre machine
Un navigateur moderne (Chrome, Edge, etc.)


## Installation

### Application Mobile
1. Naviguez dans le dossier `/mobile`.
2. Installez les dépendances avec `npm install`.

### Script IoT
1. Naviguez dans le dossier `/iot`.
2. Installez les dépendances avec `pip install -r requirements.txt`.

### Backend
1. Naviguez dans le dossier `/backend`.
2. Installez les dépendances avec `npm install`.


## Lancement

### Application Mobile
1. Dans le dossier `/mobile`, lancez l'application avec `npm start`.
2. Ouvrez l'application dans un navigateur ou un émulateur.

### Script IoT
1. Dans le dossier `/iot`, lancez le script avec `python simulate_data.py`.

### Backend
```
bash
cd backend
npm install
node index.js
```


## Vérification
1. Assurez-vous que l'application mobile reçoit et affiche correctement les tâches simulées par le script IoT.
2. Vérifiez que les interactions avec le backend fonctionnent comme prévu (ajout, suppression, mise à jour des tâches).


## Fonctionnalités
- **Ajouter une tâche** : Ajoutez une nouvelle tâche avec un titre, une description et un statut (complété ou non).
- **Afficher les tâches** : Affichez la liste des tâches avec leur statut.
- **Mettre à jour une tâche** : Modifiez le statut d'une tâche (complété ou non).
- **Supprimer une tâche** : Supprimez une tâche de la liste.


## Documentation
- Chaque composant (mobile, IoT, backend) dispose de son propre fichier README avec des instructions détaillées.
- La procédure de livraison complète se trouve dans le fichier `/docs/procedure_de_livraison.md`.

## Contributeurs
- **Dev Mobile** : JUN
- **Dev IoT** : STEVEN
- **Dev Backend** : MATTHIEU
- **DevOps** : ALHOUSSEINI
- **Dev "cross"** : LEA
