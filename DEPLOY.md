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

   > **⚠️ IMPORTANT** : Assurez-vous que `NEXT_PUBLIC_SANITY_DATASET` est bien sur **`production`** sur Vercel, même si vous utilisez `development` en local.

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

---

## 6. Acheter et Configurer un Nom de Domaine (Recommandation : `lmdpl.fr`)

Le domaine **`lmdpl.fr`** est actuellement disponible. Voici la procédure recommandée pour l'acheter et le lier à votre site Vercel.

### Étape A : Choisir un Registrar (Bureau d'enregistrement)
Pour un domaine `.fr`, il est conseillé de passer par un acteur français reconnu pour la fiabilité et le service client.

**Options Recommandées :**
1.  **OVHcloud** ([ovhcloud.com](https://www.ovhcloud.com/fr/domains/)) : Le leader français. Prix très compétitifs (souvent ~5-7€/an). Interface un peu technique mais très robuste.
2.  **Gandi** ([gandi.net](https://www.gandi.net/fr)) : Très réputé pour sa simplicité ("No Bullshit"), son interface claire et ses services inclus (email pro). Un peu plus cher (~12-15€/an) mais excellent support.

*Conseil : Achetez uniquement le "Nom de Domaine" (Domain Name Only). Vous n'avez pas besoin d'hébergement web ("Hosting") car votre site est hébergé gratuitement sur Vercel.*

### Étape B : Lier le Domaine à Vercel
Une fois le domaine acheté :

1.  Allez sur votre tableau de bord **Vercel**.
2.  Sélectionnez le projet **LMDLP**.
3.  Allez dans **Settings** -> **Domains**.
4.  Entrez `lmdpl.fr` et cliquez sur **Add**.
5.  Vercel vous recommandera une configuration (généralement changer les **Nameservers**).

### Étape C : Configuration DNS (chez OVH ou Gandi)
Connectez-vous à l'interface de gestion de votre registrar :

1.  Accédez à la gestion de votre domaine `lmdpl.fr`.
2.  Trouvez la section **Serveurs DNS** (ou **Nameservers**).
3.  Remplacez les serveurs par défaut par ceux fournis par Vercel (ex: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
4.  Validez. La propagation DNS prend généralement de 1h à 24h.

### Étape D : Mise à jour Sanity
Une fois le domaine actif (`https://lmdpl.fr`), n'oubliez pas de l'ajouter dans **Sanity** (API -> CORS Origins) comme expliqué à l'étape 5, pour que le CMS fonctionne correctement depuis cette nouvelle adresse.

---

## 7. Configurer une adresse email professionnelle (ex: `info@lmdpl.fr`)

**Important** : Vercel héberge uniquement votre site web, pas vos emails. Vous devez donc utiliser un service tiers pour vos emails.

### Option A : Utiliser l'offre incluse avec votre Domaine (OVH ou Gandi)
C'est souvent l'option la plus simple et la moins chère pour commencer.

1.  **Chez OVHcloud** :
    *   L'offre de base inclut souvent une adresse email (ex: "MX Plan").
    *   Activez le service email dans votre espace client OVH.
    *   Créez votre compte `info@lmdpl.fr`.
    *   OVH vous demandera d'ajouter des enregistrements **MX** et **TXT** à votre configuration DNS.
    *   Rendez-vous sur l'interface de gestion DNS de votre domaine (là où vous avez mis les DNS Vercel) et ajoutez ces enregistrements spécifiques.
    *   *Note : Si vous avez changé les Nameservers pour ceux de Vercel (étape 6B), vous devrez gérer les enregistrements DNS (MX, TXT) **DANS VERCEL**.*

2.  **Chez Gandi** :
    *   Gandi inclut généralement 2 boîtes mail gratuites avec chaque domaine.
    *   Allez dans l'onglet "Email" de votre domaine Gandi pour créer `info@lmdpl.fr`.
    *   Si vous avez changé les Nameservers vers Vercel, vous devrez copier les enregistrements DNS de Gandi (MX) vers Vercel.

### Option B : Google Workspace (Gmail Pro)
Pour une solution plus robuste (Gmail, Drive, Calendar sur votre domaine), mais payante (~6€/mois/utilisateur).

1.  Inscrivez-vous sur [Google Workspace](https://workspace.google.com/).
2.  Suivez l'assistant de configuration.
3.  Google vous demandera d'ajouter des enregistrements **MX** et de vérification.
4.  Si vous utilisez les Nameservers Vercel, ajoutez ces enregistrements **dans le tableau de bord Vercel** (Settings -> Domains -> DNS Records).

### Résumé Technique
Si vous pointez vos **Nameservers vers Vercel** (recommandé pour le site), Vercel devient votre gestionnaire DNS.
Vous devrez donc ajouter manuellement les enregistrements **MX** (Mail Exchange) de votre fournisseur d'email (OVH, Gandi, Google) dans l'interface DNS de Vercel.

---

## 8. Note sur le Plan Vercel (Hobby vs Pro)

Actuellement, le projet est déployé sur le plan **Hobby** (Gratuit) de Vercel.

*   **Performance** : Ce plan est largement suffisant pour le trafic attendu d'un site vitrine local. Il est très performant et rapide.
*   **Usage Commercial** : Les conditions d'utilisation de Vercel indiquent que le plan Hobby est destiné aux projets personnels et non commerciaux.
    *   *En pratique* : Beaucoup de petits sites démarrent ainsi sans problème.
    *   *Recommandation* : Si l'activité se développe ou si Vercel vous contacte, il faudra envisager de passer au plan **Pro** ($20/mois) qui est conçu pour les entreprises et offre un meilleur support.

C'est un excellent point de départ pour tester le site sans frais !

---

## 9. Note sur le Plan Sanity (Free Tier)

Le projet utilise le plan **Free** de Sanity, qui est extrêmement généreux pour un usage standard.

**Inclus Gratuitement (par mois) :**
*   **Utilisateurs** : Jusqu'à 20 personnes peuvent gérer le contenu (largement suffisant pour l'équipe).
*   **Requêtes API** : 200 000 requêtes/mois.
    *   *Concrètement* : Cela représente des milliers de visiteurs par jour.
*   **Bande Passante (Images/Assets)** : 10 Go/mois.
*   **Stockage** : 10 Go de données.

**Coût :**
*   **0€ / mois** tant que ces limites ne sont pas dépassées.
*   Sanity ne bloque pas le site brutalement mais vous prévient par email si vous approchez des limites.
*   Le passage à une offre payante se fait "à la carte" (pay-as-you-go) pour les ressources supplémentaires, ce qui est très économique.

**Conclusion** : Pour **La Maison des Petits Loups**, ce plan gratuit devrait suffire pendant très longtemps, même avec une bonne croissance du trafic !



---

## 6. Acheter et Configurer un Nom de Domaine (`lmdpl.fr`)

Le domaine **`lmdpl.fr`** est actuellement disponible. Voici comment le sécuriser et le lier à votre site.

### Étape 1 : Achat du Domaine
Je vous recommande d'utiliser un registrar français fiable comme **OVHcloud** ou **Gandi**.

1.  Allez sur [OVHcloud](https://www.ovhcloud.com/fr/domains/) ou [Gandi](https://www.gandi.net/fr).
2.  Recherchez `lmdpl.fr`.
3.  Ajoutez-le au panier et créez un compte (si nécessaire).
4.  Finalisez l'achat (environ 5-15€/an).
    *   *Note : Vous n'avez PAS besoin d'hébergement web ("Hosting") supplémentaire, juste le nom de domaine ("Domain Name Only").*

### Étape 2 : Lier le Domaine à Vercel
Une fois le domaine acheté :

1.  Allez sur votre tableau de bord **Vercel**.
2.  Sélectionnez votre projet **LMDLP**.
3.  Allez dans **Settings** -> **Domains**.
4.  Entrez `lmdpl.fr` dans le champ et cliquez sur **Add**.
5.  Vercel vous donnera des **Nameservers** (ex: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).

### Étape 3 : Configuration DNS (chez OVH/Gandi)
Retournez chez votre registrar (là où vous avez acheté le domaine) :

1.  Accédez à la gestion de votre domaine `lmdpl.fr`.
2.  Trouvez la section **Serveurs DNS** (ou **Nameservers**).
3.  Remplacez les serveurs existants par ceux donnés par Vercel.
4.  Validez.
    *   *La propagation peut prendre jusqu'à 24h, mais c'est souvent très rapide.*

Une fois propagé, votre site sera accessible via **https://lmdpl.fr** !

