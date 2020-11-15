import {app} from './app'

class Grid {
    statusDisplay: Element = document.querySelector('.status')!;
    gameActive:boolean = false;
    currentPlayer: string = "";
    gameState: string[] = [""];
    
    /** Variables  **/
    readonly  blankCell = "";
    readonly  winningConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    /** Constructor **/
    
    
    constructor() {
        this.restartGame();
        document.querySelectorAll(".cell").forEach(cell => {
                cell.addEventListener("click", (clickedCellEvent) => {this.cellClicked(clickedCellEvent) })
        });
        document.querySelector(".restartButton")!.addEventListener("click", (clickedButtonEvent) =>{ this.restartGame() });
    }
    /** Game Messages **/

    drawMessage(): string{
        return "Draw!";
    };

    winningMessage(): string{
        return `${this.currentPlayer} won!`;
    };

    currentPlayerTurn(): string{
        return `Current Player : ${this.currentPlayer}`;
    };
    
    /** Restart Game **/

    restartGame() {
        this.gameActive = true;
        this.currentPlayer = "X";
        for(let index = 0; index < 9 ; index++){
            this.gameState[index] = this.blankCell;
        }
        this.statusDisplay = document.querySelector('.status')!;
        this.statusDisplay.innerHTML = this.currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    }

    /** Click on a cell **/

    cellClicked(clickedCellEvent: Event) {
        const clickedCellDOM = clickedCellEvent.currentTarget as Element;
        const clickedCellIndex = parseInt(clickedCellDOM.getAttribute("cellIndex")!);
        
        if (!this.isCellEmpty(this.gameState[clickedCellIndex]) || !this.gameActive) {
            return;
        }

        this.cellPlayed(clickedCellDOM, clickedCellIndex);
        this.resultValidation();
    }

    cellPlayed(clickedCell: Element, clickedCellIndex: number) {
        this.gameState[clickedCellIndex] = this.currentPlayer;
        clickedCell.innerHTML = this.currentPlayer;
    }

    changeCurrentPlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.statusDisplay!.innerHTML = this.currentPlayerTurn();
    }

    resultValidation() {
        if (this.isThereAWinner()) {
            this.endTheGame(this.winningMessage());
            return;
        }

        if (this.isRoundADraw()) {
            this.endTheGame(this.drawMessage());
            return;
        }

        this.changeCurrentPlayer();
    }

    isRoundADraw = () => !this.gameState.includes(this.blankCell);

    endTheGame(message: string){
        this.statusDisplay!.innerHTML = message;
        this.gameActive = false;
    }

    isThereAWinner(){
        for (let index = 0; index < 8; index++) {
            const winCondition = this.winningConditions[index];
            let firstCell = this.gameState[winCondition[0]];
            let secondCell = this.gameState[winCondition[1]];
            let thirdCell = this.gameState[winCondition[2]];

            if (this.isCellEmpty(firstCell) || this.isCellEmpty(secondCell) || this.isCellEmpty(thirdCell)) {
                continue;
            }
            if (this.areCellsEqual(firstCell, secondCell) && this.areCellsEqual(secondCell, thirdCell)) {
                return true;
            }
        }
        return false;
    }

    isCellEmpty(cell: string){
        return cell === this.blankCell;
    }

    areCellsEqual(cell1: string, cell2: string){
        return cell1 === cell2;
    }
}

let grid = new Grid();