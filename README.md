# PokéIdle 🔥

🎮 **[Jouer sur GitHub Pages](https://francoisgoessens.github.io/pokeidle/)**

Un jeu idle basé sur l'univers Pokémon, développé en Vue 3 + Node.js. Les Pokémon farment passivement des énergies typées, évoluent, et débloquent de nouveaux membres pour ton équipe.

---

## Stack technique

**Frontend**
- Vue 3 (Composition API, `<script setup>`)
- TypeScript
- Vite
- Vuetify 3
- Pinia
- Vitest

**Backend**
- Node.js
- Express

**API externe**
- [PokéAPI](https://pokeapi.co) — données, sprites et stats des Pokémon

---

## Mécaniques de jeu

### Production d'énergie
Chaque Pokémon recruté produit passivement de l'énergie par seconde, calculée sur sa stat `speed` :
```
production/s = speed / 50
```
Les Pokémon dual-type alternent entre leurs deux énergies à chaque tick.

### Énergies typées
15 types de la Gen 1 disponibles : Normal, Feu, Eau, Plante, Électrik, Glace, Combat, Poison, Sol, Vol, Psy, Insecte, Roche, Spectre, Dragon.

### Golden Energy
Monnaie universelle obtenue en convertissant des énergies typées (1:1). Utilisée pour recruter de nouveaux Pokémon.

### Recrutement
Choisir un type → obtenir un œuf → Pokémon aléatoire de ce type pas encore possédé (pokemon de base uniquement, pas d'évolution à la sortie de l'oeuf). Le coût scale à chaque achat selon une courbe progressive :
```ts
const multiplier = (i) => Math.max(1.5, 1.9 - i * 0.05)
```

### Évolutions
Chaque Pokémon peut évoluer en dépensant de l'énergie de son type. L'évolution augmente la stat `speed` et donc la production. Les coûts scalent globalement.

### Shiny
1 chance sur 500 d'obtenir un Pokémon shiny à l'achat. Un shiny produit ×10 par rapport à la version normale.

---

## Lancer le projet

**Prérequis** : Node.js 18+

```bash
# Cloner le repo
git clone https://github.com/TON_USERNAME/pokeidle.git
cd pokeidle

# Frontend
cd client
npm install
npm run dev

# Backend (autre terminal)
cd server
npm install
npm run dev
```

- Frontend : http://localhost:5173
- Backend : http://localhost:3000

---

## À venir

- Système d'évolution complet
- Pokédex visuel avec filtres
- Sauvegarde de partie
- Système de quêtes
- Prestige
