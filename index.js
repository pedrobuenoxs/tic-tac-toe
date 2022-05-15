var readlineSync = require('readline-sync');


const emptyString = '  '; 
const boardData = Array(9).fill(emptyString);




const players = {
  1:" ",
  2:" ",
};

function setPlayer(){
  players[1] = readlineSync.question(`Player 1, escolha seu simbolo:\n`)
  players[2] = readlineSync.question(`Player 2, escolha seu simbolo:\n`)
}


//constantes para fazer um log de jogadas de cada player
const playerOne = [];
const playerTwo = [];


//combinações vencedoras
const winnerMoves = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]



function drawBoard(positions) {
  console.log(`
    ${positions[0]} | ${positions[1]} | ${positions[2]}
    -----------
    ${positions[3]} | ${positions[4]} | ${positions[5]}
    -----------
    ${positions[6]} | ${positions[7]} | ${positions[8]}
  `);
}

function showTutorial() {
  console.log(`
  ### Escolha a posiçao que deseja jogar baseado no tabuleiro abaixo ###

     0 | 1 | 2
    -----------
     3 | 4 | 5
    -----------
     6 | 7 | 8

  ######################################################################
  `);
}

function isEmpty(position) {
  return boardData[position] === emptyString;
}

function changePlayer(currentPlayer) {
  if (currentPlayer === players[1]) {
    currentPlayer = players[2];
  } else {
    currentPlayer = players[1];
  }
}

function setPlayerMovement() {
  let maxMoves = 9;
  let actualMove = 0;


  while (actualMove < maxMoves)
  {
    let position = readlineSync.question(`Jogador ${currentPlayer}, escolha a posição:\n `)
    console.log(currentPlayer)
    if (isEmpty(position)) {

      boardData[position] = currentPlayer; //posicionando a jogada do player

      changePlayer(currentPlayer); //trocando de jogador

      drawBoard(boardData); //desenhando o tabuleiro atualizado

      actualMove++ //registrando a jogada

    } else {

      console.log(`A posição ${position} já foi usada`);
      drawBoard(boardData);

    }    
  }
    
}

function logMoves(array){
  for (let i = 0; i<array.length; i++){
      if(array[i] == players[1]){
          playerOne.push(i);
      } else {
          playerTwo.push(i);
      }
      }        
}



function setWinner(arr1,arr2,winnerArray){
  let winner = 0;
    
  winnerArray.forEach((el) => { 
      if(el.every( v => arr1.includes(v)) ){
          winner = 1; //player 1 ganhou
      }
  })

  winnerArray.forEach((el) => { 
      if(el.every( v => arr2.includes(v)) ){
          winner = 2; //player 2 ganhou
      }
  })
  return winner;

  
}

function showWinner(moves,winnerMoves){
  let winner = setWinner(playerOne,playerTwo,winnerMoves); //padrão -> empate
  logMoves(moves);      

  if(winner == 0){
    return `Deu velha!`
  } else {
    return `O vencedor foi o player ${winner}`
  }
  
  
}






function keepRunnig(){
  let game = true;
  let status;
  let currentPlayer = players[1];
  

  while (game){
    
    
    //console.log(boardData)
    showTutorial();
    setPlayer();
    //console.log(players)
    setPlayerMovement(currentPlayer,boardData);
    logMoves(boardData);
    console.log(showWinner(boardData,winnerMoves))

    function keepGaming(){
      status = readlineSync.question(`Deseja jogar outra partida? (S/N)\n`)

      if(status.toLowerCase() == 's'){
        game = true;
      } else if (status.toLowerCase() == 'n'){
        game = false;
      } else {
        console.log('Comando inválido')
      }
    }

    keepGaming();
  }

}

keepRunnig();


