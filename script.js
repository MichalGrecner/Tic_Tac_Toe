"use strict"

//module for creating playground grid 
const renderPlayground = (()=>{
    const gmBoard = document.getElementById("gameBoard");
    const create=()=>{
        let squareCounter=0;
        for (let x=0; x<3; x++){
            for(let y=0;y<3;y++){
                const square = document.createElement("div");
                square.className="square " + "sq"+squareCounter;
                square.id=squareCounter;
                square.innerHTML=gameBoard.gB[squareCounter];
                squareCounter++;
                gmBoard.appendChild(square);
            }
        }
        
    }
    //removes grid 
    const remove=()=>{
        let squares = document.querySelectorAll(".square");
        squares.forEach((e)=>{
            e.remove();
        })
        
    }
    //when play again, triggered from function winner/noWinner
    const restartPlayground = () => {
        const info = document.getElementById("info");
        const btnAgain = document.createElement("button"); //button play again
        const btnQuit = document.createElement("button"); //button quit - goes back to input form
        btnAgain.innerText="PLAY AGAIN!";
        btnQuit.innerText="QUIT";
        info.appendChild(btnAgain);
        info.appendChild(btnQuit);

        btnAgain.addEventListener("click", resetArrayWinner);
        btnQuit.addEventListener("click", quitSession);

        function resetArrayWinner(){ //when play again is pressed
            gameBoard.gB=["", "", "", "", "", "", "", "", ""]; //resets game board array
            gameBoard.resetWinner(""); //set winner to ""
            remove();//removes gameBoard grid
            gameFlow.changeStatus(true); //enables eventListener for gameBoard
            startGame(); //render new gameBoard
            btnAgain.remove(); //removes button "Play Again"
            btnQuit.remove(); // removes button "Quit"
            gameFlow.delNotice(); // removes info message 
            gmBoard.removeEventListener("click", resetArrayWinner);
        }

        function quitSession(){ //when quit is pressed
            remove();
            btnAgain.remove();
            btnQuit.remove();
            gameFlow.delNotice();
            gameBoard.gB=["", "", "", "", "", "", "", "", ""];
            gameBoard.resetWinner(""); 
            document.getElementById("inputs").style.display="block"; //shows input form
            const playerOneInput = document.getElementById("playerOne").value=""; 
            const playerTwoInput = document.getElementById("playerTwo").value="";
            gameFlow.changeStatus(true)
        }
    }
    return {create, remove, restartPlayground};
}
)();

const gameBoard = (()=>{
    let gB=["", "", "", "", "", "", "", "", ""];
    let winner="";
    let resetWinner = (newVal) => {winner = newVal}

    let checkWinner=(gB)=>{ //defines winning condition
        if((gB[0]===gB[1] && gB[2]===gB[0]) && gB[1] != "") winner= gB[0];
        if((gB[3]===gB[4] && gB[5]===gB[3]) && gB[4] != "") winner= gB[3];
        if((gB[6]===gB[7] && gB[8]===gB[6]) && gB[7] != "") winner= gB[6];
        if((gB[0]===gB[3] && gB[6]===gB[0]) && gB[3] != "") winner= gB[0];
        if((gB[1]===gB[4] && gB[7]===gB[1]) && gB[4] != "") winner= gB[1];
        if((gB[2]===gB[5] && gB[8]===gB[2]) && gB[5] != "") winner= gB[2];
        if((gB[0]===gB[4] && gB[8]===gB[0]) && gB[4] != "") winner= gB[0];
        if((gB[2]===gB[4] && gB[6]===gB[2]) && gB[4] != "") winner= gB[2];
        
       //who is the winner
        if(winner == player1.getSymbol() || winner == player2.getSymbol()){
            let winRoundPlayer = winner== player1.getSymbol()? player1 : player2; //defines who is the winnner
            gameFlow.winner(winRoundPlayer);
        }
    }
    return{resetWinner, winner, gB, checkWinner} 
})();

const gameFlow = (()=>{
    let clickCount=0;
    let status = true;
    let changeStatus = (newVal) => {status = newVal}
    const clickOnBoard = ()=>{
        let getDivID = document.querySelectorAll(".square");
        let divID;
        let playerMark=clickCount%2==0?player1.getSymbol():player2.getSymbol();// playmark = X or O
        
        if (status){ //set to false when winner/noWinner is inicialized to prevent click on Board when the game is over
            getDivID.forEach((e) =>{
                e.addEventListener("click", function ClickOnSquare(){
                    divID = e.id
                    if(gameBoard.gB[divID]=="") { //prevent from clicking on alread used position
                        gameBoard.gB[divID]=playerMark;
                        clickCount++;
                    }
                    gameBoard.checkWinner(gameBoard.gB)
                    if(clickCount == 9) noWinner();
                    renderPlayground.remove()
                    renderPlayground.create()
                    clickOnBoard();
                })  
            })
        }
    }
    const noWinner = () => {
        notice("No winner, try again!");
        changeStatus(false)
        renderPlayground.restartPlayground()
    }

    const winner = (winnnerPlayer) => {
        clickCount=0; 
        changeStatus(false)
        notice(`${winnnerPlayer.name} is the winner!`)
        renderPlayground.restartPlayground();
    }
    const notice = (message) => { //create info message if winner or noWinner
        let infoBoard  = document.getElementById("info");
        let msg = document.createElement("p");
        msg.className="pInfo";
        msg.innerHTML=message;
        infoBoard.appendChild(msg);
    }
    const delNotice = () =>{
        let msg = document.getElementsByClassName("pInfo")[0];
        msg.remove()
    }
    return{clickOnBoard, winner, noWinner, notice, delNotice, changeStatus}
})();


const Player = (name, symbol) => {
    this.name = name;
    const getSymbol = ()=> symbol;
    const getName = () => name;
    return{ getSymbol, name}
}

const addNames = (()=>{ //input form behaviour
    const playerOneInput = document.getElementById("playerOne");
    const playerTwoInput = document.getElementById("playerTwo");
    const submit = document.getElementById("submit");
    const listener = submit.addEventListener("click",function  eventHandler(e){ 
        e.preventDefault();
        var name1 = playerOneInput.value
        var name2 = playerTwoInput.value
        player1.name=name1
        player2.name=name2
        console.log(player1)
        let inputs = document.getElementById("inputs");
        inputs.style.display="none";
        startGame();
    })
})();

var player1 = Player("", "X");
var player2 = Player("", "0");

function startGame () { 
    renderPlayground.create(); 
    gameFlow.clickOnBoard();
}
