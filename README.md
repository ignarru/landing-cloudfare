# Landing Pro

This project uses [Supabase](https://supabase.com) to store the contact form submissions. The form **requires** valid Supabase credentials to function properly.

## Environment variables

Copy `.env.example` to `.env` (this file is ignored by Git) and fill in your Supabase credentials, or set these variables in your deployment service. The example file only contains placeholders, so your deployment environment must provide actual credentials:


```bash
cp .env.example .env
```

Then edit `.env` and set:

```bash
SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
# or use SUPABASE_SERVICE_KEY / SUPABASE_SECRET_KEY / SUPABASE_ANON_KEY
```

Without valid values for `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` the
contact form will fail to store submissions.

The client sends contact requests to `/api/contact` and the server inserts them into Supabase using these credentials. If the environment variables are missing, the API responds with `503 Service unavailable` and submissions are logged locally instead of stored.

## Start the server

Run the development server with:

```bash
npm run start
```
This command runs `tsx server/index.ts` under the hood.

## Build & Deploy

Run `npm run build` to generate the static site under `dist/public/`.

Static assets are served with compression and long-term caching. A
`manifest.webmanifest` file enables basic PWA support.

When deploying, ensure required environment variables—such as `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY`—are provided.

## About section

A personal "Acerca de mí" section appears before the services listing. You can edit the content in `client/src/components/About.tsx` and replace the photo at `client/public/profile.png`.

