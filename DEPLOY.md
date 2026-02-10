# Déployer sur Vercel

Suivez ces étapes pour mettre votre site en ligne gratuitement avec Vercel.

## 1. Créer un compte Vercel
Si ce n'est pas déjà fait, créez un compte sur [vercel.com](https://vercel.com/signup) et connectez-vous avec votre compte **GitHub**.

## 2. Importer le projet
1. Sur votre tableau de bord Vercel, cliquez sur **"Add New..."** -> **"Project"**.
2. Dans la liste "Import Git Repository", trouvez votre dépôt **LMDLP** et cliquez sur **"Import"**.

## 3. Configurer le projet
Dans l'écran de configuration "Configure Project" :

1. **Framework Preset** : Laisser sur **Next.js**.
2. **Root Directory** : Laisser vide (`./`).
3. **Build and Output Settings** : Laisser les valeurs par défaut.
4. **Environment Variables** :
   Dépliez cette section et ajoutez les variables suivantes (copiées depuis votre fichier `.env.local`) :

   | Nom | Valeur |
   | :--- | :--- |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | `vs3o0cqb` |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` |

   *(Ajoutez-les une par une).*

## 4. Déployer
Cliquez sur **"Deploy"**.

Vercel va construire votre site. Une fois terminé (environ 1-2 minutes), vous verrez un écran de félicitations avec le lien vers votre site en ligne (ex: `lmdlp.vercel.app`).

---

## 5. (Optionnel) Ajout du domaine production dans Sanity
Pour que le studio Sanity fonctionne correctement en production et pour éviter les erreurs CORS :

1. Allez sur [sanity.io/manage](https://www.sanity.io/manage).
2. Sélectionnez votre projet (`vs3o0cqb`).
3. Allez dans **API** -> **CORS Origins**.
4. Cliquez sur **Add CORS Origin**.
5. Ajoutez l'URL fournie par Vercel (ex: `https://lmdlp.vercel.app`).
6. Cochez **Allow credentials**.
7. Sauvegardez.
