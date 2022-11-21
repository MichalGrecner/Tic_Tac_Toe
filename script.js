"use strict"


//TODO: 
// input name player1 player2
// check if score =5 -> end and print score
// if there is no winner of the match
// prohibit overwrite used squares
// html / css styling 





//module for creating playground grid 
const renderPlayground = (()=>{
    const container = document.getElementById("container");
    const create=()=>{
        console.log("spustena fce create")
        let squareCounter=0;
        for (let x=0; x<3; x++){
            for(let y=0;y<3;y++){
                const square = document.createElement("div");
                square.className="square";
                square.id=squareCounter;
                square.innerHTML=gameBoard.gB[squareCounter];
                squareCounter++;
                container.appendChild(square);
            }
        }
        //gameFlow.clickOnBoard();
    }
    const remove=()=>{
        console.log("spustena fce REMOVE")
        let squares = document.querySelectorAll(".square");
        squares.forEach((e)=>{
            e.remove();
        })
        
    }

    const restartPlayground = () => {
        console.log("prave bezi restartPlayground_____________________________")
        //remove();
        
        //gameBoard.resetgB();
        gameBoard.gB=["", "", "", "", "", "", "", "", ""];
        gameBoard.winner="";
        gameBoard.resetgB(["", "", "", "", "", "", "", "", ""]);
        gameBoard.resetWinner("");

        
        //startGame();
        
        //create();
    }
    return {create, remove, restartPlayground};
}
)();

const gameBoard = (()=>{
    let gB=["", "", "", "", "", "", "", "", ""];
    let winner="";

    let resetgB = (newVal) => {
        gB=newVal;
        console.log("gB v gameBoard/resetgB" + gB)
        return gB
    }
    let resetWinner = (newVal) => {winner = newVal}



    let checkWinner=(gB)=>{
        
        console.log("gb v checkwiner: " +gB);

        if((gB[0]===gB[1] && gB[2]===gB[0]) && gB[1] != "") winner= gB[0];
        if((gB[3]===gB[4] && gB[5]===gB[3]) && gB[4] != "") winner= gB[3];
        if((gB[6]===gB[7] && gB[8]===gB[6]) && gB[7] != "") winner= gB[6];
        if((gB[0]===gB[3] && gB[6]===gB[0]) && gB[3] != "") winner= gB[0];
        if((gB[1]===gB[4] && gB[7]===gB[1]) && gB[4] != "") winner= gB[1];
        if((gB[2]===gB[5] && gB[8]===gB[2]) && gB[5] != "") winner= gB[2];
        if((gB[0]===gB[4] && gB[8]===gB[0]) && gB[4] != "") winner= gB[0];
        if((gB[2]===gB[4] && gB[6]===gB[2]) && gB[4] != "") winner= gB[2];
        
       // condition who is the winner
        if(winner == player1.getSymbol() || winner == player2.getSymbol()){
            let winRoundPlayer = winner== player1.getSymbol ()? player1 : player2;
            gameFlow.winner(winRoundPlayer);
        }
        
        
    }
    return{resetWinner, resetgB ,winner, gB, checkWinner} //odebrano resetgB
})();

const gameFlow = (()=>{
    let clickCount=0;
    const clickOnBoard = ()=>{
        let getDivID = document.querySelectorAll(".square");
        let divID;
        console.log("cekam na kliknuti")
        let playerMark=clickCount%2==0?player1.getSymbol():player2.getSymbol();
        getDivID.forEach((e) =>{
            e.addEventListener("click", function(){
                divID = e.id
                if(gameBoard.gB[divID]=="") {
                    gameBoard.gB[divID]=playerMark;
                    clickCount++;
                }
                gameBoard.checkWinner(gameBoard.gB)
                renderPlayground.remove()
                renderPlayground.create()
                
                
                console.log(" CLICK COUNT v GAMEFLOW/click on board: " +clickCount)
                if(clickCount == 8) noWinner();
                clickOnBoard();
            })
        })
    }
    const noWinner = () => {
        //add some more cool stuff
        console.log("No winner, try again!");
        renderPlayground.restartPlayground()
        

    }

    const winner = (winnnerPlayer) => {
        //something
        
        console.log(`Winner of this round is ${winnnerPlayer.getName()}`)
        clickCount=0; 
        renderPlayground.restartPlayground();
        

    }

    return{clickOnBoard, winner, noWinner}
})();


const Player = (name, score, symbol) => {
    const getSymbol = ()=> symbol;
    const getName = () => name;
    let winMatch = (otherScore) => {
        return `${name} won the match! Score ${score} : ${otherScore}!`
    }
    return{winMatch, getName, getSymbol, score}
}





const player1 = Player("HAD", 0, "X");
const player2 = Player("MYS", 0, "0");

startGame()

function startGame () { 
    console.log("jede startGame?")

    renderPlayground.create(); 
    gameFlow.clickOnBoard();
}



//gameFlow.clickOnBoard();


//factory function player
//factory function for wining determination
//factory funtion for game flow - mouse pointer click

