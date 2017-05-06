ESLINT GUIDE:

The required eslint packages are included as devDependencies in the package.json
    npm install

Recommended editor is VS code, and here is how it is best set up:

In your settings.json, edit to have the following line. 
    "editor.formatOnSave": false,
In your keybindings.json 
    {
        "key": "meta+`",
        "command": "eslint.executeAutofix",
        "when": "editorTextFocus"
    }

Ctrl+shift+P, install extension, ESLint: dbaeumer.vscode-eslint
In the root of your WORKSPACE directory, file called .eslintrc
