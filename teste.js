
var readlineSync = require('readline-sync');

const players = {
    1:" ",
    2:" ",
  };



players[1] = readlineSync.question(`Player 1, escolha seu simbolo:\n`)
players[2] = readlineSync.question(`Player 2, escolha seu simbolo:\n`)


console.log(players)