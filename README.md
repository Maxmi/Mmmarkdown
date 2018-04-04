# Mmmmmmarkdown

## Summary
My implementation of [Mmmarkdown benchmark module of Learners Guild curriculum](https://curriculum.learnersguild.org/Phases/Practice/Modules/Mmmarkdown/)
A full-stack single-page web application - markdown editor.
Features:
- user can create, save, update and delete documents  
- user can preview the markdown test in real time  
- all communication with the server is done via AJAX  
- last modified document is always displayed on top of the sidebar  

What I learned doing this project:
- using an UPSERT database function which either updates a record in database if it already exists or inserts new one if it doesn't exist
- creating a database trigger and stored procedure   
- using the Remarkable package
- using Lodash library
- using CSS Grids and Flexbox  
- using Material Icons Font  


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

# Getting started

These instructions are for getting a copy of the project on your local environment.

- Clone/Fork - `git clone https://github.com/Maxmi/Mmmarkdown.git`
- Install npm packages - `npm install`

# Setting up your database

- Create database and tables - `npm run db:init`
(__WARNING__: This will remove any existing db called `markdown` in postgres)

# Setting up your config

* Run `cp .env.template .env` command in the terminal to create your own `.env` file and enter your config values in the `.env` file

# Starting your development server

* Run `npm start`
* To access the app go to `localhost:3000`
