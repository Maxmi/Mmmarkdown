# Mmmmmmarkdown

## Summary
My implementation of [Mmmarkdown benchmark module of Learners Guild curriculum](https://curriculum.learnersguild.org/Phases/Practice/Modules/Mmmarkdown/)
A full-stack web application - markdown editor where files are listed in the sidebar and last modified file is displayed on top of the list

***** bds: Since this is a learning project, specify exactly what you learned by doing the project.

**** bds: You didn't mention the coolest part of the app: that it previews the markdown in real time! :)

***** bds: Also: talk about the architecture: a single page app where all communication with the server is done via AJAX after the initial load, etc.

# Built with:

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [AJAX](api.jquery.com/jquery.ajax)
* [EJS](https://ejs.co/)
* [Lodash](https://lodash.com/)
* [Remarkable](https://github.com/jonschlinkert/remarkable)
* [Material Design](https://material.io/icons/)  



# Deployed Site

  https://markdown-mira.herokuapp.com/

**** bds: there's a bug on the deployed site. I created a file (cool) and named it while it was still blank. Then I made changes to the file, and I didn't see the "save changes" button at the bottom -- so I clicked "save file again". But that made the file go blank. :-/  Perhaps hide the "save file" button when the file has already been saved?

# Getting started

These instructions are for getting a copy of the project on your local environment.

- Clone/Fork - `git clone https://github.com/Maxmi/Mmmarkdown.git`
- Install npm packages - `npm install`

# Setting up your database

- Create database - `npm run db:create`
(__WARNING__: This will remove any existing db called `markdown` in postgres)
- Run db schema - `npm run db:schema`

***** bds: consider combining the above two into one command, unless you have a use case where they would be used separately

# Setting up your config

* Run `cp .env.template .env` command in the terminal to create your own `.env` file and enter your config values in the `.env` file

**** bds: typo above (or in the filename) -- the file is named .envtemplate -- so the above command doens't work! I would recommend renaming the file (rather than changing the above to .envtemplate)

# Starting your development server

* Run `npm start`
* To access the app go to `localhost:3000`

***** bds: where are your tests??? :sob: To be taken seriously as a developer, you want to have tests.