# Life Stats

Statistics interest me, and I've always wanted something that could keep track of overall life stats, so I decided to make a simple app where I can log that information.

## Getting Started
1. Clone repo
2. cd repo
3. `npm i` (this repo uses npm workspaces, so you only need to be in root dir)
4. `npm run api` in a dedicated terminal
5. `npm run ui` in a dedicated terminal
6. Navigate to http://localhost:5173
7. Potentially use the [browserPlugin](https://github.com/incutonez/job-applications/blob/main/browserPlugin/manifest.json) in your browser (for [FireFox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)) and use the Copy Details context menu that shows on a job description on LinkedIn or Indeed

## Database

It's good to note that SQLite is used for the database, and because SQLite does not allow usernames/passwords, I created encryption/decryption functionality for the DB.  Basically, if you set the [DATABASE_PATH](https://github.com/incutonez/job-applications/blob/main/packages/api/.env#L1) to something other than the default, then when the app starts, we'll attempt to [decrypt](https://github.com/incutonez/job-applications/blob/main/packages/api/src/db/config.ts#L59-L62) the file at that location.

The very first time you run this app, the encrypted file won't exist, unless you're clairvoyant or something.  When it does exist, we'll decrypt and copy it over to `src/db/data.db`.  When the server is [stopped](https://github.com/incutonez/job-applications/blob/main/packages/api/src/app/app.service.ts#L19-L24), we attempt to encrypt and save it back to `DATABASE_PATH`.  This will be saved as a gzipped tar, encrypted with the [DATABASE_PASSWORD](https://github.com/incutonez/job-applications/blob/main/packages/api/.env#L2) that you set, and only that password can decrypt it.

## UI Stack
- [Vue 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/) v4
- [Reka UI](https://reka-ui.com/) for some core components, like [ComboBox](https://reka-ui.com/docs/components/combobox#combobox) and [DateField](https://reka-ui.com/docs/components/date-picker)
- [TanStack Table](https://tanstack.com/table/v8/docs/framework/vue/vue-table) for data tables
- [TanStack Query](https://tanstack.com/query/v5/docs/framework/vue/overview) for API calls
- [TanStack Virtual](https://tanstack.com/virtual/latest/docs/introduction) for virtual scrolling in ComboBox
- [Redux Toolkit](https://vue-redux.js.org/introduction/getting-started) for minor state management
- [PapaParse](https://www.papaparse.com/) for pasting job details from plugin

## API Stack
- [NestJS](https://docs.nestjs.com/)
- [OpenAPI Plugin](https://docs.nestjs.com/openapi/introduction) for generating Swagger doc
- [Sequelize](https://sequelize.org/docs/v6/getting-started/)
- [PapaParse](https://www.papaparse.com/) for CSV upload from existing Excel spreadsheet
- [SQLite3](https://www.npmjs.com/package/sqlite3) for using local SQLite DB

## OpenAPI Generation
When the API starts, it generates the Swagger doc based on the endpoint markups.  This Swagger doc gets thrown in the spec dir.  The dist and generated dirs are created from running the [openapi-generator-cli](https://www.npmjs.com/package/@openapitools/openapi-generator-cli) through Docker, so there's no need to download Java on your local machine... you just need Docker in order to run this.  It knows to use Docker through [this config file](https://github.com/incutonez/jobs/blob/main/packages/spec/openapitools.json#L6).

## Current features

This all started because I didn't want to manage job applications in an Excel spreadhseet, so I decided to build my own UI, with accompanying API and DB.  It's a fairly simple interface, but I also wanted to try out some framework agnostic libraries in a Vue 3 app.

1. Job Applications
   1. Allows uploading CSV data
   2. Allows creating new applications
   3. Allows adding comments to applications
   4. Allows linking applications to others (for things like reposted roles)
2. Exercises
   1. Allows uploading Strava CSV data
   2. Allows importing from Strava, but you will have to auth first
   3. Conversions between Metric and Imperial (given your browser's language setting)
3. Auditing
   1. Each feature has a "History" tab that shows your actions that have taken place throughout that feature

## Test Environment

The test environment was something I wanted to get up, so I could use it as part of my application portfolio, and I decided to use the following architecture:

1. Cloudflare - for all my DNS concerns, using origin rule rewrites for the API and UI
2. AWS
   1. EC2 - for hosting my docker containers, added swap memory due to 1 GB micro instance limit and vite being a pig when building
   2. Lambda - for running functions to start/stop the instance
   3. EventBridge - for crontab scheduling of Lambda to start/stop instance
3. Let's Encrypt/[certbot](https://certbot.eff.org/instructions?ws=other&os=snap) - for SSL certs
4. [DDClient](https://ddclient.net/) - for updating the EC2 IP every time it starts, due to not having an Elastic IP
5. Docker - for containerizing my API and UI code for easy deployments
6. Google Analytics - for my analytics needs, had to customize [vite build](https://github.com/incutonez/life-stats/blob/main/packages/ui/vite.config.ts#L13-L19) to only include in test build