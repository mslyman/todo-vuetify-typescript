// Install vue-cli
$ npm install @vue/cli -g
// Create project from template
// Select TS Preset (vue-router, sass, typescript)
$ vue create todo-app

// Add vuetify (add and invoke plugin vue-cli-plugin-vuetify)
$ vue add vuetify 
// Use a pre-made template? (will replace App.vue and HelloWorld.vue) Yes
// ? Use custom theme? Yes
// ? Use a-la-carte components? Yes
// ? Use babel/polyfill? Yes
(this will add @babel/polyfill, babel-plugin-transform-imports, stylus, stylus-loader packages, ...)


Visual Studio Code
File - Preferences - Settings - User settings
{
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.minimap.enabled": false,
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    }
  ]
}

Browser compatibility:
https://cli.vuejs.org/guide/browser-compatibility.html#browserslist
https://golb.hplar.ch/2018/02/Conditionally-load-polyfills.html


Add components and change theme colors in vuetify.js

    primary: '#3F51B5',
    secondary: '#F48FB1',
    accent: '#EF9A9A',


