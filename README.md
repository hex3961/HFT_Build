# HFT build tracker (installable app with sync)

Static PWA + a Supabase backend. Works fully offline; signing in makes every device converge on the same data.

## 1. Backend (Supabase, about 10 min)
1. Create a free project at supabase.com.
2. **SQL Editor -> New query**: paste `supabase-setup.sql`, Run.
3. **Authentication -> Users -> Add user -> Create new user**: your email + a password, tick auto-confirm.
4. **Authentication -> Sign In / Providers**: turn **off** "Allow new users to sign up" so nobody else can create accounts.
5. **Project Settings -> API Keys**: copy the **Project URL** and the **Publishable key** (`sb_publishable_...`; the older `anon` key also works for now, but Supabase is retiring it by end of 2026).
6. Paste both into `config.js`. Never paste the secret / service_role key anywhere in this folder.

The publishable key is designed to be public. Your data is protected by login + Row Level Security, not by hiding the key.

## 2. Host it (HTTPS is required to install)
- **GitHub Pages:** new repo, upload the folder contents (index.html at the repo root), then Settings -> Pages -> Deploy from branch `main`, folder `/ (root)`. On the free plan Pages needs a public repo. URL: `https://<user>.github.io/<repo>/`.
- **Or Netlify Drop / Cloudflare Pages:** drag the folder in, get an HTTPS URL in seconds.

## 3. Install on Android (no browser bar)
Open the URL in Chrome -> menu (three dots) -> **Install app** (or Add to home screen -> Install). It gets its own icon in the app drawer and opens full screen like a native app. Repeat on the iPad via Safari's Share -> Add to Home Screen.

## 4. Turn sync on
Open the app -> **Log** tab -> **Sync & backup** -> sign in with the user from step 3. Do this once per device. The pill in the top-right shows Synced / Syncing / Offline / Sign in to sync (tap it to jump to the sign-in card).

## Optional: a real .apk
Not needed for the install above. If you want an actual Android package (to sideload or share), go to pwabuilder.com, enter your hosted URL, and choose the Android package. It wraps your PWA in a Trusted Web Activity and hands you a zip with the APK and signing key. Keep the key file safe.

## How sync behaves
- Every change is saved on the device first, then pushed about 1.5 s later. The app also pulls when you reopen it, when you come back online, and every 60 s while open.
- If two devices both changed while apart, they merge: ticks from both are kept, the larger per-day problem count wins, and the newer scores win. If two devices log on the same day while offline, the larger count wins, so correct it with "Set total" if needed.
- Theme (light/dark) is per device and is not synced.
- Use **Export backup** now and then. Clearing the browser's site data on a device wipes its local copy (the server copy remains).
- Free Supabase projects can be paused after a stretch of inactivity. Check Supabase's current policy; daily use keeps it active, and your local copy plus backups cover you either way.

## Files
`index.html` (UI) - `app.js` (logic + sync) - `config.js` (your keys) - `sw.js` (offline cache) - `manifest.webmanifest` + `icons/` (install) - `supabase-setup.sql` (schema)
