# Boilarplate for ES6 and nodejs REST API

This boilarplate is used for creating nodejs rest api using ES6 syntax.

## Package that includes this boilarplate:

* Webpack(for creating build version).
* Typescript (for ES6 code).
* Babel (for compiling typescript code).

### Entry File:
All the files all resided inside src folder.Entry file is 'app.ts' <br>
Folder structure
```
src/
  controller/
    index.ts
  model/
    index.ts
  routes/
    index.ts
  app.ts
  config.ts
  dbconfig.ts
```

### File details

#### app.ts:
  Contains the bootstrapper and includes the dependencies.
#### config.ts
  Contains global configs of the app.
#### dbconfig.ts
  Contains the global dbconfig of the app.
#### Routes:
 All the routes related codes are resides here.
#### Controller:
  All the controller related codes are resides here.
#### Model:
  All the database model related codes are resides here