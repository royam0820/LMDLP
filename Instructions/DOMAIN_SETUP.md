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

## Bonus: Activate Free Email (Start10M)
With every OVH domain, you are entitled to **1 free email account** (5GB storage).

1.  In your OVH Manager, go to **Web Cloud** > **Domains** > **lmdpl.fr**.
2.  Look for "Web Hosting" or "Hébergement Web" in the "General Information" box.
3.  If it says "None" or "Aucun", click on the **...** (three dots) next to it and select **Activate included hosting** (Start10M).
4.  Follow the activation steps (it's free, select "DNS MX Record" if asked).
5.  Wait about 10-15 minutes for activation.

### How to Create Your Email Account
Once the hosting is active:

1.  Go to the **Emails** tab (still under `lmdpl.fr`).
2.  On the right side, click **Create an email address**.
3.  **Account Name**: Enter the prefix you want (e.g., `contact` or `info`).
4.  **Description**: Enter a display name (e.g., "La Maison des Petits Loups").
5.  **Password**: Create a strong password.
6.  **Size**: Leave at 5GB (max).
7.  Click **Next** and **Confirm**.

### How to Check Your Emails
You can access your emails directly via OVH Webmail:
*   URL: **https://www.ovh.com/fr/mail/**
*   Login: `contact@lmdpl.fr` (your full email)
*   Login: `contact@lmdpl.fr` (your full email)
*   Password: The one you just created.

## Step 4: Configure Email Sending (Vercel)
To allow your website to send emails using this new account, you must add your password to Vercel securely.

1.  Go to your **Vercel Dashboard** > Select Project **LMDPL**.
2.  Go to **Settings** > **Environment Variables**.
3.  Add a new variable:
    *   **Key**: `SMTP_PASSWORD`
    *   **Value**: (Enter your OVH email password here)
4.  Click **Save**.
5.  **Important**: You must **Redeploy** your project for this change to take effect.
    *   Go to **Deployments** tab.
    *   Click the three dots (`...`) next to the latest deployment.
    *   Select **Redeploy**.

## Summary Checklist
- [ ] Add domain in Vercel.
- [ ] Add A Record in OVH.
- [ ] Add CNAME Record in OVH.
- [ ] Add CORS origins in Sanity Management Dashboard.
- [ ] Activate Start10M hosting for free email.
- [ ] Create email account (`contact@lmdpl.fr`).
