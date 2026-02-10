# La Maison des Petits Loups - Site Vitrine

Site web corporate pour la boutique de jouets et atelier créatif **La Maison des Petits Loups** à Puteaux.
Ce projet est une application **Next.js** connectée à **Sanity CMS** pour la gestion de contenu.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Langage**: TypeScript
- **Icônes**: [Lucide React](https://lucide.dev/)

## ✨ Fonctionnalités (V0)

- **Accueil** : Présentation rapide, dernières nouveautés et accès rapide aux sections clés.
- **La Boutique** : Vitrine des produits et coups de cœur (pas de vente en ligne).
- **Anniversaires** : Informations sur les formules d'anniversaire et demande de réservation.
- **Ateliers & Stages** :
  - Distinction entre "Ateliers de l'année" et "Stages Vacances".
  - Affichage des dates (début/fin) pour tous les types d'ateliers.
  - Partenariat avec **Codeacademy123** mis en avant.
  - Page de détail pour chaque atelier avec bouton "Lire la suite".
- **Contact** : Informations pratiques (horaires, adresse, map).
- **Témoignages** : Section dynamique affichant les derniers avis clients (gérés via Sanity).

## 🛠️ Installation & Démarrage

### Pré-requis
- Node.js 18+ installé.
- Un projet Sanity configuré (ID et Dataset).

### 1. Cloner et installer
```bash
git clone <votre-repo>
cd LMDPL
npm install
```

### 2. Configuration d'environnement
Créez un fichier `.env.local` à la racine du projet avec vos identifiants Sanity :

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## 📝 Gestion de Contenu (Sanity CMS)

L'interface d'administration est accessible via : **[http://localhost:3000/studio](http://localhost:3000/studio)**

### Schémas Principaux

#### 1. Ateliers (`atelier`)
Utilisé pour les cours à l'année et les stages vacances.
- **Période** :
  - *À l'année* : Cours récurrents (ex: Hebdomadaire).
  - *Vacances Scolaires* : Stages ponctuels.
- **Dates** : Champs `Date de début` et `Date de fin` visibles pour tous les types.
- **Image** :
  > **Recommandation** : Utilisez des images au format paysage **16:9** (ex: 1200x675px) pour un affichage optimal sur le site.
- **Organisateur** : Si "Codeacademy123" est sélectionné, un badge spécifique et un lien de réservation externe peuvent être affichés.

#### 2. Produits (`product`)
- Gestion simple des articles mis en avant dans la section Boutique.

#### 3. Témoignages (`testimonial`)
- Permet d'ajouter des avis clients (Nom, Texte, Note 1-5, Date).
- Les 3 derniers avis sont affichés sur la page d'accueil.
- Une page dédiée `/temoignages` liste l'ensemble des avis.

---

### 💡 Astuces & FAQ CMS

#### Comment supprimer un Élément (Atelier, Produit, Témoignage) ?
1.  Ouvrez l'élément que vous souhaitez supprimer dans le Studio.
2.  Cliquez sur les **trois petits points (...)** situés en bas à droite de l'écran (à côté du bouton vert "Publish").
3.  Sélectionnez **Delete** (Supprimer) dans la liste.
4.  Confirmez la suppression. **Attention, c'est irréversible !**

#### Comment modifier l'ordre des éléments ?
- **Ateliers** : Triés automatiquement par période et date.
- **Produits** : Triés par nom.
- **Témoignages** : Triés par date (du plus récent au plus ancien).

---

### Modifications Récentes
- **Images des Ateliers** : La liste des ateliers utilise désormais un ratio d'image **16:9** (`aspect-video`). Les images sont affichées en entier sans être coupées verticalement de manière arbitraire.
- **Détails Atelier** : La description dans la liste est tronquée. Un lien "Lire la suite" permet d'accéder à une page dédiée (`/ateliers/[slug]`) avec toutes les informations.

## 📂 Structure du Projet

```
/src
  /app
    /(site)       # Pages du frontend (layout public)
    /studio       # Route pour Sanity Studio
  /components     # Composants React réutilisables
    /Workshops    # Composants spécifiques aux ateliers listes
  /sanity
    /schemaTypes  # Définitions des schémas de données
    /lib          # Configuration client Sanity
  /lib            # Utilitaires (ex: getAteliers.ts)
```

## 🚀 Déploiement

Le projet est optimisé pour être déployé sur **Vercel**.
Connectez simplement votre dépôt GitHub à Vercel et ajoutez les variables d'environnement configurées dans `.env.local`.
