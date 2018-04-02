# Mmmmmmarkdown

## Summary
My implementation of [Mmmarkdown benchmark module of Learners Guild curriculum](https://curriculum.learnersguild.org/Phases/Practice/Modules/Mmmarkdown/)
A full-stack web application - markdown editor where files are listed in the sidebar and last modified file is displayed on top of the list

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



# Getting started

These instructions are for getting a copy of the project on your local environment.

- Clone/Fork - `git clone https://github.com/Maxmi/Mmmarkdown.git`
- Install npm packages - `npm install`

# Setting up your database

- Create database - `npm run db:create`
(__WARNING__: This will remove any existing db called `markdown` in postgres.)
- Run db schema - `npm run db:schema`

# Setting up your config

* Run `cp .env.template .env` command in the terminal to create your own `.env` file and enter your config values in the `.env` file

# Starting your development server

* Run `npm start`
* To access the app go to `localhost:3000`
