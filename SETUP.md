# Setting up MIOS accounts

You do every step here yourself, in your own Supabase account. Claude never
creates accounts or handles keys. About 20 minutes.

Nothing here changes the live site at maqasid.ogden.ag: the deploy workflow
builds with both switches off, so it stays guest-only until you choose
otherwise. Use the existing MIOS project (the one that held `mios-snapshots`).

## 0. Push `main` first
Local `main` has two commits that `origin/main` lacks (the Amanah Gate wording,
`6e3d718`, and `e79cc6c`). From the main checkout:

```bash
git push origin main
```

The cloud branch merges `origin/main` at the start of Session B, so this must
happen before then.

## 1. Create your account, then close sign-ups
Sign-ups stay off, so your account is made by hand first.
1. **Authentication → Users → Add user → Create new user**: your email, tick
   **Auto confirm user**. No password is needed; you sign in with an emailed code.
2. **Authentication → Sign In / Providers**: turn **Allow new users to sign up** off.
   Keep **Email** on.

## 2. Emailed code
**Authentication → Emails → Magic Link** (the email template): add the code, so
you can sign in by typing it. A phone app added to the Home Screen can't open the
link itself.

```html
<p>Or type this code in the app: <strong>{{ .Token }}</strong></p>
```

Supabase lets you change this template only once your own email sender is saved
(**Authentication → Emails → SMTP Settings**); until then the email carries the
link alone. The code is 6 to 10 digits depending on the project, and the app takes any of them.

## 3. Where sign-in links may go
**Authentication → URL Configuration**:
- **Site URL**: `https://maqasid.ogden.ag`
- **Redirect URLs**: add `http://localhost:5173` and `http://localhost:4173`

The phone check (step 6) signs in with the code, so it needs no link address.

## 4. Create the tables
**SQL Editor → New query**: paste all of `supabase/migrations/0001_mios_records.sql`
and **Run**. Expect "Success. No rows returned". Run it once; a second run fails with
"already exists", which is harmless.

Then a new query with all of `supabase/checks/rls_check.sql`, and **Run**. It needs
the account from step 1. Expect one row: **RLS check passed**. It changes nothing.
If it stops with "RLS CHECK FAILED: …", don't go on; send Claude the message.

## 5. Replace the old key
The old anon key was once built into the public site, so treat it as known.
1. **Project Settings → API Keys**: create a **publishable** key (`sb_publishable_…`).
2. On the same page, turn off the legacy **anon** and **service_role** keys
   (the dashboard's wording for this may differ). Nothing live uses them: the
   site has had accounts switched off since 2026-07-27.
3. Copy `.env.example` to `.env.local` in the project folder and fill in:
   - `VITE_SUPABASE_URL`: the Project URL, `https://<ref>.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: the new **publishable** key

**Never** use the `service_role` or **secret** key. It skips every row rule, and
anything starting with `VITE_` is shipped to the browser. `.env.local` is in
`.gitignore`, so it stays on this computer.

## 6. The phone check (after Session A)
For a local build with both features on, set in `.env.local`:

```
VITE_CLOUD_ACCOUNTS=1
VITE_OFFLINE_SHELL=1
```

Then Claude builds it and serves it on your network with `vite preview --host`.
Open the address it gives on your phone (same Wi-Fi), sign in with the code, then
turn on airplane mode and reopen it. Clear the two switch lines afterwards if you
like; the live site is never built from `.env.local`.

## Checking the SQL without the live project (for Claude or a developer)
`supabase/checks/local/run.sh` loads a stand-in for Supabase's `auth` schema and the
migration into a throwaway local Postgres, runs `rls_check.sql`, and asks for invoice
numbers from many sessions at once. Never point it at the live project.

## If something goes wrong
| What you see | Likely cause |
|---|---|
| "RLS CHECK FAILED: no account yet" | Step 1.1 not done |
| "RLS CHECK FAILED: table mios_records is missing" | Step 4's migration not run, or run in another project |
| The email has no code | The Magic Link template (step 2) not saved; it needs your own email sender first |
| "Signups not allowed" when signing in | The email typed isn't the account made in step 1 |
