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
        this.RestartGame();
        document.querySelectorAll(".cell").forEach(cell => {
                cell.addEventListener("click", (clickedCellEvent) => {this.CellClicked(clickedCellEvent) })
        });
        document.querySelector(".restartButton")!.addEventListener("click", (clickedButtonEvent) =>{ this.RestartGame() });
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

    RestartGame() {
        this.gameActive = true;
        this.currentPlayer = "X";
        for(let index = 0; index < 9 ; index++){
            this.gameState[index] = this.blankCell
        }
        this.statusDisplay = document.querySelector('.status')!;
        this.statusDisplay.innerHTML = this.currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    }

    /** Click on a cell **/

    CellClicked(clickedCellEvent: Event) {
        const clickedCellDOM = clickedCellEvent.currentTarget as Element;
        const clickedCellIndex = parseInt(clickedCellDOM.getAttribute("cellIndex")!);
        
        console.log(this.gameState);

        var clickedCell = this.gameState[clickedCellIndex];

        if (!this.IsCellEmpty(clickedCell) || !this.gameActive) {
            return;
        }

        this.CellPlayed(clickedCellDOM, clickedCellIndex);
        this.ResultValidation();
    }

    CellPlayed(clickedCell: Element, clickedCellIndex: number) {
        this.gameState[clickedCellIndex] = this.currentPlayer;
        clickedCell.innerHTML = this.currentPlayer;
    }

    ChangeCurrentPlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.statusDisplay!.innerHTML = this.currentPlayerTurn();
    }

    ResultValidation() {
        if (this.IsThereAWinner()) {
            this.EndTheGame(this.winningMessage());
            return;
        }

        if (this.IsRoundADraw()) {
            this.EndTheGame(this.drawMessage());
            return;
        }

        this.ChangeCurrentPlayer();
    }

    IsRoundADraw = () => !this.gameState.includes(this.blankCell);

    EndTheGame(message: string){
        this.statusDisplay!.innerHTML = message;
        this.gameActive = false;
    }

    IsThereAWinner(){
        for (let index = 0; index < 8; index++) {
            const winCondition = this.winningConditions[index];
            let firstCell = this.gameState[winCondition[0]];
            let secondCell = this.gameState[winCondition[1]];
            let thirdCell = this.gameState[winCondition[2]];

            if (this.IsCellEmpty(firstCell) || this.IsCellEmpty(secondCell) || this.IsCellEmpty(thirdCell)) {
                continue;
            }
            if (this.AreCellsEqual(firstCell, secondCell) && this.AreCellsEqual(secondCell, thirdCell)) {
                return true;
            }
        }
        return false;
    }

    IsCellEmpty(cell: string){
        return cell === this.blankCell;
    }

    AreCellsEqual(cell1: string, cell2: string){
        return cell1 === cell2;
    }
}

var grid = new Grid();