This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# React-app model

This is a simple react app model that you can use to start building your react projects.

## Getting started

### Cloning the repository

To start building with this model, you can just download the zip file or clone the repository:

```bash
$ git clone https://github.com/Levysantiago/react-app-model.git
```

### Installing dependences

To install all dependences just run:

```bash
$ npm install
```

### Configuring environment variables

You can set your environment-specific variables by creating a `.env` file, and use the [.env.example](https://github.com/Levysantiago/react-app-model/blob/master/.env.example) as example:

```
APP_NAME=ReactModel
HOST=127.0.0.1
PORT=5000
```

### Folder structure

After the steps, your project should look like this:

```
react-model/
  node_modules/
  public/
    favicon.ico
    index.html
    manifest.json
  src/
    components/
    lib/
    pages/
        App.js
    App.css
    App.test.js
    index.css
    index.js
    logo.svg
    routes.jsx
    serviceWorker.js
  .gitignore
  .env
  .env.example
  package-lock.json
  package.json
  README.md
```

### Running

To run the project you can use the script:

```bash
$ npm start
```

Then you can open http://localhost:3000 to view it in the browser. After each modification saved, the page will reload.

## Knowledges

You can access the links below for more information

- [Create-react-app](https://github.com/facebook/create-react-app)
- [Node.js](https://nodejs.org/)
