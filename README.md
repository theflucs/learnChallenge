# CODING PROBLEM

## 1 - FOOBAR

Scrivi un piccolo programma che stampi ogni numero da 1 a 100 su una nuova riga.

- Per ogni multiplo di 3, stampa “Foo” invece del numero.
- Per ogni multiplo di 5, stampa “Bar” invece del numero.
- Per ogni numero multiplo di 3 e 5 insieme, stampa “FooBar” invece del numero.

## 2 - Carta, forbice e sasso

### Acceptance Criteria

- Posso giocare Umano vs Computer?
- Posso giocare Computer vs Computer?
- Posso giocare una nuova partita conclusa quella precedente?

### Commands:

```
nvm use
pnpm i
pnpm test
```

#### Run app in terminal

`pnpm start`

#### Web App | Launch a local development server with live reload

`pnpm install live-server`

[Live Server VS Code extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

Click "Go Live" in status bar

`pnpm live`

Check Live Server settings if you encounter port issues or serving files from dist folder.
Also [its GitHub](https://github.com/ritwickdey/vscode-live-server/issues) can help you troubleshoot any issue.

## HTML Structure and Data Attributes

The core logic of the app relies on the use of the `dataset` property.
Be aware of it if you plan to make changes to the `index.html` file.

## Unit test

The core logic of the app is tested using `vitest`.

The logic of the Foobar is in `src/foobar`.
The logic of Rock, paper, scissors, game is in `src/rps`.
