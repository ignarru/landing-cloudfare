# Landing Pro

This project uses [Supabase](https://supabase.com) to store the contact form submissions. The form **requires** valid Supabase credentials to function properly.

## Environment variables

Copy `.env.example` to `.env` (this file is ignored by Git) and fill in your Supabase credentials, or set these variables in your deployment service. The example file only contains placeholders, so your deployment environment must provide actual credentials:


```bash
cp .env.example .env
# For Pages development copy the variables to `.dev.vars`
cp .dev.vars.example .dev.vars
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

### Deploy to Cloudflare Pages

1. In your Cloudflare dashboard create a new Pages project and connect this
   repository.
2. If the build fails saying "npm ci" cannot install dependencies, run `npm install` locally to generate a `package-lock.json`.
3. Confirm `package-lock.json` is committed and pushed before deploying. You can
   verify the commit being built by checking the commit hash in the Pages build logs.
4. **Leave the Root Directory empty** (i.e. use the repository root). If you
   select a subfolder (for example `client`), Cloudflare runs `npm ci` in that
   directory and fails because it lacks a `package-lock.json`.
5. Set the **Build command** to `npm run build` and the **Build output
   directory** to `dist/public`.
6. Add your Supabase credentials (`SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY`) in the **Environment Variables** section.
7. Deploy the site. The contact form will post to `/api/contact`, which is
   implemented as a Pages Function under `functions/api/contact.ts`.
8. For local development run `npm run dev` after building to simulate the
   production environment. Copy `.dev.vars.example` to `.dev.vars` and fill in
   your Supabase credentials so the function can access them locally.
   
## About section

A personal "Acerca de mí" section appears before the services listing. You can edit the content in `client/src/components/About.tsx` and replace the photo at `client/public/profile.png`.

## About scroll offset

The navigation uses `ABOUT_EXTRA_OFFSET` in `client/src/lib/constants.ts` to
determine how far the page scrolls when "Acerca de mí" is clicked. Adjust these
values if the section appears misaligned on mobile or desktop.

## Contact scroll offset

The scroll offset used when navigating to the contact form is exported as `CONTACT_EXTRA_OFFSET` in `client/src/lib/constants.ts` and can be overridden by passing an `offset` prop to `Contact`.

```tsx
import Contact from "./Contact";
import { CONTACT_EXTRA_OFFSET } from "@/lib/constants";

## Consulta Gratis offset

If the navigation link to the **Consulta Gratis** section does not align
correctly, adjust `CONSULTA_EXTRA_OFFSET` in
`client/src/lib/constants.ts`. The values control the mobile and desktop
offsets used when scrolling to the section.

// Increase desktop offset
const customOffset = { ...CONTACT_EXTRA_OFFSET, desktop: -260 };

<Contact offset={customOffset} />;
```

## Servicios scroll offset

If clicking the **Servicios** link does not align the section properly,
adjust `SERVICES_EXTRA_OFFSET` in `client/src/lib/constants.ts`. The values
define the mobile and desktop offsets used when scrolling to the section.

## Proceso scroll offset

Similarly, the **Proceso** navigation link relies on `PROCESS_EXTRA_OFFSET` in
`client/src/lib/constants.ts`. Tweak these values if the heading of the process
section is hidden behind the navigation bar on mobile or desktop.

## License

This project is distributed under the [MIT license](LICENSE). The same license is
declared in the `license` field of [package.json](package.json) for tooling
compatibility.
