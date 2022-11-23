"use strict"


//TODO: 
// input name player1 player2
// check if score =5 -> end and print score
// if there is no winner of the match
// prohibit overwrite used squares
// html / css styling 





//module for creating playground grid 
const renderPlayground = (()=>{
    const gmBoard = document.getElementById("gameBoard");
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
                gmBoard.appendChild(square);
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
        const container = document.getElementById("container");
        const btn = document.createElement("button");
        btn.innerText="click to continue"
        //gameFlow.notice("click to continue");
        container.appendChild(btn)
        btn.addEventListener("click", resetArrayWinner);
        function resetArrayWinner(){
            console.log("___WINDOW ADD EVENT CLICK_")

            gameBoard.gB=["", "", "", "", "", "", "", "", ""];
            gameBoard.resetWinner("");
            //gameFlow.clickCount=0; <––––––––– WHY DOESNT WORK?!?!?!
            remove();
            startGame();
            btn.remove();
            gameFlow.delNotice();

            gmBoard.removeEventListener("click", resetArrayWinner);
        }



        //remove();
        
        //gameBoard.resetgB();
        
        //gameBoard.winner="";
        //gameBoard.resetgB(["", "", "", "", "", "", "", "", ""]);
        

        
        //startGame();
        
        //create();
    }
    return {create, remove, restartPlayground};
}
)();

const gameBoard = (()=>{
    let gB=["", "", "", "", "", "", "", "", ""];
    let winner="";
    console.log("SPUSTENO GAMEBOARD")

    // let resetgB = (newVal) => {
    //     gB=newVal;
    //     console.log("gB v gameBoard/resetgB" + gB)
    //     return gB
    // }
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
            let winRoundPlayer = winner== player1.getSymbol()? player1 : player2;
            gameFlow.winner(winRoundPlayer);
        }
        
        
    }
    return{resetWinner, winner, gB, checkWinner} //odebrano resetgB,resetgB 
})();

const gameFlow = (()=>{
    let clickCount=0;
    
    const clickOnBoard = ()=>{
        let getDivID = document.querySelectorAll(".square");
        let divID;
        console.log("cekam na kliknuti")
        let playerMark=clickCount%2==0?player1.getSymbol():player2.getSymbol();
        getDivID.forEach((e) =>{
            e.addEventListener("click", function ClickOnSquare(){

                console.log(" CLICK COUNT v GAMEFLOW/click on board: " +clickCount)
                
                divID = e.id
                if(gameBoard.gB[divID]=="") {
                    gameBoard.gB[divID]=playerMark;
                    clickCount++;
                }
                console.log("GAMEBOARD V GAMEFLOW: " + gameBoard.gB)

                gameBoard.checkWinner(gameBoard.gB)
                if(clickCount == 9) noWinner();
                
                renderPlayground.remove()
                renderPlayground.create()
                
                clickOnBoard();
            })
            
        })




        
    }
    const noWinner = () => {
        //add some more cool stuff
        notice("No winner, try again!");
        clickCount=0; 
        renderPlayground.restartPlayground()
        

    }

    const winner = (winnnerPlayer) => {
        //something
        clickCount=0; 
        //notice(`Winner of this round is ${winnnerPlayer.getName()}`)
        notice(`Winner is ${winnnerPlayer.name}`)
        
        renderPlayground.restartPlayground();
    }

    const notice = (message) => {
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

    return{clickOnBoard, winner, noWinner, notice, delNotice}
})();


const Player = ( name, score, symbol) => {
    const getSymbol = ()=> symbol;
    //const getName = () => name;
    let winMatch = (otherScore) => {
        return `${name} won the match! Score ${score} : ${otherScore}!`
    }
    return{winMatch, getSymbol, score, name}
}




const addNames = (()=>{
    const playerOneInput = document.getElementById("playerOne");
    const playerTwoInput = document.getElementById("playerTwo");
    const submit = document.getElementById("submit");
    const form = document.getElementById("form");
    
    
    const listener = submit.addEventListener("click",function  eventHandler(e){ 
        e.preventDefault();
        var name1 = playerOneInput.value
        var name2 = playerTwoInput.value
        player1.name=name1
        player2.name=name2
        console.log(player1)
        form.remove();
        console.log("PRVNI??")
        startGame();
        
    })
    
})();




var player1 = Player("", 0, "X");
var player2 = Player("", 0, "0");




//startGame()

function startGame () { 
    renderPlayground.create(); 
    gameFlow.clickOnBoard();
}



//gameFlow.clickOnBoard();


//factory function player
//factory function for wining determination
//factory funtion for game flow - mouse pointer click

