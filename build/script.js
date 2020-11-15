"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid = /** @class */ (function () {
    /** Constructor **/
    function Grid() {
        var _this = this;
        this.statusDisplay = document.querySelector('.status');
        this.gameActive = false;
        this.currentPlayer = "";
        this.gameState = [""];
        /** Variables  **/
        this.blankCell = "";
        this.winningConditions = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ];
        this.isRoundADraw = function () { return !_this.gameState.includes(_this.blankCell); };
        this.restartGame();
        document.querySelectorAll(".cell").forEach(function (cell) {
            cell.addEventListener("click", function (clickedCellEvent) { _this.cellClicked(clickedCellEvent); });
        });
        document.querySelector(".restartButton").addEventListener("click", function (clickedButtonEvent) { _this.restartGame(); });
    }
    /** Game Messages **/
    Grid.prototype.drawMessage = function () {
        return "Draw!";
    };
    ;
    Grid.prototype.winningMessage = function () {
        return this.currentPlayer + " won!";
    };
    ;
    Grid.prototype.currentPlayerTurn = function () {
        return "Current Player : " + this.currentPlayer;
    };
    ;
    /** Restart Game **/
    Grid.prototype.restartGame = function () {
        this.gameActive = true;
        this.currentPlayer = "X";
        for (var index = 0; index < 9; index++) {
            this.gameState[index] = this.blankCell;
        }
        this.statusDisplay = document.querySelector('.status');
        this.statusDisplay.innerHTML = this.currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(function (cell) { return cell.innerHTML = ""; });
    };
    /** Click on a cell **/
    Grid.prototype.cellClicked = function (clickedCellEvent) {
        var clickedCellDOM = clickedCellEvent.currentTarget;
        var clickedCellIndex = parseInt(clickedCellDOM.getAttribute("cellIndex"));
        if (!this.isCellEmpty(this.gameState[clickedCellIndex]) || !this.gameActive) {
            return;
        }
        this.cellPlayed(clickedCellDOM, clickedCellIndex);
        this.resultValidation();
    };
    Grid.prototype.cellPlayed = function (clickedCell, clickedCellIndex) {
        this.gameState[clickedCellIndex] = this.currentPlayer;
        clickedCell.innerHTML = this.currentPlayer;
    };
    Grid.prototype.changeCurrentPlayer = function () {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.statusDisplay.innerHTML = this.currentPlayerTurn();
    };
    Grid.prototype.resultValidation = function () {
        if (this.isThereAWinner()) {
            this.endTheGame(this.winningMessage());
            return;
        }
        if (this.isRoundADraw()) {
            this.endTheGame(this.drawMessage());
            return;
        }
        this.changeCurrentPlayer();
    };
    Grid.prototype.endTheGame = function (message) {
        this.statusDisplay.innerHTML = message;
        this.gameActive = false;
    };
    Grid.prototype.isThereAWinner = function () {
        for (var index = 0; index < 8; index++) {
            var winCondition = this.winningConditions[index];
            var firstCell = this.gameState[winCondition[0]];
            var secondCell = this.gameState[winCondition[1]];
            var thirdCell = this.gameState[winCondition[2]];
            if (this.isCellEmpty(firstCell) || this.isCellEmpty(secondCell) || this.isCellEmpty(thirdCell)) {
                continue;
            }
            if (this.areCellsEqual(firstCell, secondCell) && this.areCellsEqual(secondCell, thirdCell)) {
                return true;
            }
        }
        return false;
    };
    Grid.prototype.isCellEmpty = function (cell) {
        return cell === this.blankCell;
    };
    Grid.prototype.areCellsEqual = function (cell1, cell2) {
        return cell1 === cell2;
    };
    return Grid;
}());
var grid = new Grid();
