"use strict"

//module for creating playground grid 
const renderPlayground = (()=>{
    const container = document.getElementById("container");
    const create=()=>{
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
        gameFlow.clickOnBoard();
    }
    const remove=()=>{
        let squares = document.querySelectorAll(".square");
        squares.forEach((e)=>{
            e.remove();
        })
        
    }
    return {create, remove};
}
)();

const gameBoard = (()=>{
    let gB=["", "", "", "", "", "", "", "", ""];
    
    
    const checkWinner=()=>{
        let winner="zatim zadny";
        if((gB[0]===gB[1] && gB[2]===gB[0]) && gB[1] != "") winner= gB[0];
        if((gB[3]===gB[4] && gB[5]===gB[3]) && gB[4] != "") winner= gB[3];
        if((gB[6]===gB[7] && gB[8]===gB[6]) && gB[7] != "") winner= gB[6];
        if((gB[0]===gB[3] && gB[6]===gB[0]) && gB[3] != "") winner= gB[0];
        if((gB[1]===gB[4] && gB[7]===gB[1]) && gB[4] != "") winner= gB[1];
        if((gB[2]===gB[5] && gB[8]===gB[2]) && gB[5] != "") winner= gB[2];
        if((gB[0]===gB[4] && gB[8]===gB[0]) && gB[4] != "") winner= gB[0];
        if((gB[2]===gB[4] && gB[6]===gB[2]) && gB[4] != "") winner= gB[2];

        console.log(winner)
        return winner
    }
    return{ gB, checkWinner}
})();

const gameFlow = (()=>{
    let clickCounter=0;
    const clickOnBoard = ()=>{
        let getDivID = document.querySelectorAll(".square");
        let divID;

        

        let player=clickCounter%2==0? "X":"Y";

        

        getDivID.forEach((e) =>{
            e.addEventListener("click", function(){
                
                divID = e.id
                gameBoard.gB[divID]=player;
                renderPlayground.remove()
                renderPlayground.create()
                gameBoard.checkWinner()
                clickCounter++;
                
            })
            
        })
        
    }
    return{clickOnBoard}
})();


renderPlayground.create();
gameFlow.clickOnBoard();



//factory function player
//factory function for wining determination
//factory funtion for game flow - mouse pointer click

