interface Symbol{
    readonly symbol:string;
}

class PlayerOne implements Symbol{
    symbol:string  = "X";
}

class PlayerTwo implements Symbol{
    symbol:string  = "O";
}

class EmptySymbol implements Symbol{
    symbol:string  = "";
}
 
export default class Grid {
    statusDisplay: Element = document.querySelector('.status')!;
    gameActive:boolean = false;
    currentPlayer: Symbol = new PlayerOne();
    gameState: Symbol[] = [];
    
    /** Variables  **/
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
        if(this.isItPlayerOnesTurn()){
            return "Player One won!";
        }else{
            return "Player Two won!";
        }
    };

    currentPlayerTurn(): string{
        return `Current Player : ${this.currentPlayer.symbol}`;
    };
    
    /** Restart Game **/

    restartGame() {
        this.gameActive = true;
        this.currentPlayer = new PlayerOne();
        for(let index = 0; index < 9 ; index++){
            this.gameState[index] = new EmptySymbol();
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

    private cellPlayed(clickedCell: Element, clickedCellIndex: number) {
        this.gameState[clickedCellIndex] = this.currentPlayer;
        clickedCell.innerHTML = this.currentPlayer.symbol;
    }

    private changeCurrentPlayer() {
        this.currentPlayer = this.isItPlayerOnesTurn() ? new PlayerTwo() : new PlayerOne();
        this.statusDisplay!.innerHTML = this.currentPlayerTurn();
    }

    private isItPlayerOnesTurn(): boolean{
        return this.currentPlayer.symbol === new PlayerOne().symbol
    }

    private resultValidation() {
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

    private endTheGame(message: string){
        this.statusDisplay!.innerHTML = message;
        this.gameActive = false;
    }

    /** Grid status analysis methods **/

    private isRoundADraw():boolean {
        let result = true;
        this.gameState.forEach(cell => {
            if(this.isCellEmpty(cell)){
                result = false;
                return;
            }
        })
        return result;
    };

    private isThereAWinner(){
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

    /** Cell comparisons methods **/

    private isCellEmpty(cell: Symbol){
        return this.areCellsEqual(cell, new EmptySymbol());
    }

    private areCellsEqual(cell1: Symbol, cell2: Symbol){
        return cell1.symbol === cell2.symbol;
    }
}

let grid = new Grid();

export {Grid};