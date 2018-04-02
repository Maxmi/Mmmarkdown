# Mmmmmmarkdown

## Summary
My implementation of [Mmmarkdown benchmark of Learners Guild curriculum](https://curriculum.learnersguild.org/Phases/Practice/Modules/Mmmarkdown/)

## To install
- Clone/Fork
- `$ npm install`
- Create database (__WARNING__: This will remove any existing db called `markdown` in postgres.)
  - `$ npm run db:create`

***** bds: Would you ever want to create the db and *not* run the schema? If the answer is no, then you could just do both in the db:create command. You could have a separate db:schema command if you think you'd want to be able to do that one separately...
- Run db schema
  - `$ npm run db:schema`
- Start the server
  - `$ npm start`

***** bds: When I ran npm start, I got this error: 

```
> markdown@1.0.0 start /Users/bonnie/src/code_reviews/mira/Mmmarkdown
> node src/app.js

/Users/bonnie/src/code_reviews/mira/Mmmarkdown/src/server/allfiles.js:65
modules.export = router
^

ReferenceError: modules is not defined
```

I changed it to module.export. Did this actually work on your machine...?

After I fixed that, I got a second error: 

```
/Users/bonnie/src/code_reviews/mira/Mmmarkdown/node_modules/express/lib/router/index.js:458
      throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
      ^

TypeError: Router.use() requires a middleware function but got a Object
```

Aborting for now. ;)