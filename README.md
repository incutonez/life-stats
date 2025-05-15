# Job Applications

Instead of managing job applications in an Excel spreadhseet, I decided to build my own UI, with accompanying API and DB.  It's a fairly simple interface, but I also wanted to try out some framework agnostic libraries in a Vue 3 app.

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
