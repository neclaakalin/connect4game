import React, { useEffect, useState } from "react";
import GameColumn from "../../components/GameColumn/GameColumn";
import styles from "./GameBoard.module.scss";

const initialColumnValues: {
  [index: number]: Array<any>;
} = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

const color_array = ["red", "green", "yellow"];

const GameBoard = () => {
  const [currentColor, setCurrentColor] = useState<any>("red");
  const [columnValues, setColumnValues] = useState(initialColumnValues);
  const [winner, setWinner] = useState<any>();
  const [isOver, setIsOver] = useState<boolean>(false);
  const [lastMove, setLastMove] = useState<{
    column: number;
    row: number;
    color: "red" | "yellow";
  }>();
  const [scores, setScores] = useState<{
    red: number;
    yellow: number;
    green: number;
  }>({
    red: 0,
    yellow: 0,
    green: 0,
  });

  useEffect(() => {
    if (
      Math.min(...Object.values(columnValues).map((value) => value.length)) ===
      6
    ) {
      setIsOver(true);
    } else {
      let gameWinner = checkMatch();
      if (gameWinner) {
        const newScore = scores[gameWinner] + 1;
        setScores({ ...scores, [gameWinner]: newScore });
        setWinner(gameWinner);
      }
    }
  }, [columnValues]);

  const checkMatch = () => {
    if (lastMove) {
      const column = lastMove.column;
      const row = lastMove.row;
      const color = lastMove.color;

      // check row
      for (let i = Math.max(0, column - 3); i <= Math.min(column, 3); i++) {
        if (
          columnValues[i][row] === color &&
          columnValues[i + 1][row] === color &&
          columnValues[i + 2][row] === color &&
          columnValues[i + 3][row] === color
        ) {
          return color;
        }
      }

      // check column
      if (
        columnValues[column][row - 3] === color &&
        columnValues[column][row - 2] === color &&
        columnValues[column][row - 1] === color
      ) {
        return color;
      }

      // check cross, both left and right
      for (let i = Math.max(0, column - 3); i <= Math.min(column, 3); i++) {
        for (let j = Math.max(0, row - 3); j <= Math.min(row, 2); j++) {
          if (
            columnValues[i][j] === color &&
            columnValues[i + 1][j + 1] === color &&
            columnValues[i + 2][j + 2] === color &&
            columnValues[i + 3][j + 3] === color
          ) {
            return color;
          }
        }
      }

      for (let i = Math.max(0, column - 3); i <= Math.min(column, 3); i++) {
        for (let j = 3; j <= Math.min(row + 3, 5); j++) {
          if (
            columnValues[i][j] === color &&
            columnValues[i + 1][j - 1] === color &&
            columnValues[i + 2][j - 2] === color &&
            columnValues[i + 3][j - 3] === color
          ) {
            return color;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (lastMove) {
      setColumnValues({
        ...columnValues,
        [lastMove.column]: [...columnValues[lastMove.column], lastMove.color],
      });
      setCurrentColor(
        color_array[
          (color_array.findIndex(
            (currentValue) => currentValue === currentColor
          ) +
            1) %
            3
        ]
      );
    }
  }, [lastMove]);

  const handleColumnClick = (index: number) => {
    if (columnValues[index].length < 6 && !winner) {
      setLastMove({
        column: index,
        row: columnValues[index].length,
        color: currentColor,
      });
    }
  };

  const handleNewGameClick = () => {
    setColumnValues(initialColumnValues);
    setLastMove(undefined);
    setWinner(undefined);
    setIsOver(false);
  };

  const handleUndo = () => {
    console.log("clicked");
    if (lastMove) {
      let newColumnValues = columnValues[lastMove.column];
      newColumnValues.pop();
      setColumnValues({
        ...columnValues,
        [lastMove.column]: newColumnValues,
      });
      setCurrentColor(
        color_array[
          (color_array.findIndex(
            (currentValue) => currentValue === currentColor
          ) +
            2) %
            3
        ]
      );
      if (winner) {
        setWinner(undefined);
      }
      if (isOver) {
        setIsOver(false);
      }
      setLastMove(undefined);
    }
  };

  return (
    <>
      <div className={styles.topBar}>
        <p className={styles.scoreRed}> {scores.red} </p>
        <p className={styles.scoreGreen}> {scores.green} </p>
        <button className={styles.gameButton} onClick={handleNewGameClick}>
          New Game
        </button>
        <button
          disabled={lastMove ? false : true}
          className={styles.gameButton}
          onClick={handleUndo}
        >
          Undo
        </button>
        <p className={styles.scoreYellow}> {scores.yellow} </p>
        {winner && (
          <p className={styles.alertMessage}> {`Winner is ${winner}`} </p>
        )}{" "}
        {isOver && <p className={styles.alertMessage}> Game is over! </p>}
      </div>
      <div className={styles.gameBoard}>
        <GameColumn
          currentColor={currentColor}
          rowValues={columnValues[0]}
          index={0}
          onClick={handleColumnClick}
        />
        <GameColumn
          currentColor={currentColor}
          rowValues={columnValues[1]}
          index={1}
          onClick={handleColumnClick}
        />
        <GameColumn
          currentColor={currentColor}
          rowValues={columnValues[2]}
          index={2}
          onClick={handleColumnClick}
        />
        <GameColumn
          currentColor={currentColor}
          rowValues={columnValues[3]}
          index={3}
          onClick={handleColumnClick}
        />
        <GameColumn
          currentColor={currentColor}
          rowValues={columnValues[4]}
          index={4}
          onClick={handleColumnClick}
        />
        <GameColumn
          currentColor={currentColor}
          rowValues={columnValues[5]}
          index={5}
          onClick={handleColumnClick}
        />
        <GameColumn
          currentColor={currentColor}
          rowValues={columnValues[6]}
          index={6}
          onClick={handleColumnClick}
        />
      </div>
    </>
  );
};

export default GameBoard;
