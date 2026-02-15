# Configuring Your Domain: lmdpl.fr (OVH + Vercel)

Here is a step-by-step guide to connecting your OVH domain to your Vercel project.

## Step 1: Vercel Configuration
1.  Connectez-vous à votre tableau de bord **Vercel**.
2.  Allez dans votre projet **LMDPL**.
3.  Allez dans **Settings** > **Domains**.
4.  Entrez votre nom de domaine : `lmdpl.fr` dans le champ d'ajout.
5.  Cliquez sur **Add**.
6.  Vercel va probablement aussi suggérer d'ajouter `www.lmdpl.fr`. Acceptez (Add).
7.  Vercel will now provide you with the **DNS Records** you need to add to OVH.
    *   **A Record** (for the root domain `lmdpl.fr`): Usually `76.76.21.21`
    *   **CNAME Record** (for `www.lmdpl.fr`): `cname.vercel-dns.com`

## Step 2: OVH Configuration
1.  **Log in to your OVH Manager** (https://www.ovh.com/manager/).
2.  Go to **Web Cloud** > **Domains** > **lmdpl.fr**.
3.  Click on the **DNS Zone** tab.
4.  **Important**: If you have existing records (like "Parking OVH"), you should delete or modify them to avoid conflicts.

### Add the A Record (Root Domain)
1.  Click **Add an entry**.
2.  Select **A**.
3.  **Sub-domain**: Leave this empty (or put `@` if OVH requires a value, but usually empty for root).
4.  **Target (IPv4)**: Enter Vercel's IP: `76.76.21.21`.
5.  Click **Next** and **Confirm**.

### Add the CNAME Record (www)
1.  Click **Add an entry**.
2.  Select **CNAME**.
3.  **Sub-domain**: Enter `www`.
4.  **Target**: Enter `cname.vercel-dns.com.` (Note the dot at the end if OVH requires it, otherwise just `cname.vercel-dns.com`).
5.  Click **Next** and **Confirm**.

*Note: Changes can take anywhere from a few minutes to 24 hours to propagate, but typically it takes about 1 hour for Vercel to verify.*

## Step 3: Update Sanity (Crucial Step)
Once your domain is active (e.g., you can visit `https://lmdpl.fr`), you must tell Sanity that this new domain is safe to use.

1.  Log in to your **Sanity Project Dashboard** (https://www.sanity.io/manage).
2.  Select your project (`LMDPL`).
3.  Go to **API** > **CORS Origins**.
4.  Click **Add Origin**.
5.  Enter `https://lmdpl.fr` and `https://www.lmdpl.fr`.
6.  Check **Allow credentials**.
7.  Click **Save**.
8.  Do the same for `http` versions if you want to support non-https initially (not recommended for production).

**Why?** If you skip this, the Studio (`/studio`) will not load on your new domain, and you might see CORS errors in the console.

## Summary Checklist
- [ ] Add domain in Vercel.
- [ ] Add A Record in OVH.
- [ ] Add CNAME Record in OVH.
- [ ] Add CORS origins in Sanity Management Dashboard.
