import React from "react";
import GameRow from "../GameRow/GameRow";
import styles from "./GameColumn.module.scss";

interface GameColumnProps {
  currentColor: "red" | "yellow";
  rowValues: Array<"red" | "yellow">;
  index: number;
  onClick: (n: number) => void;
}

const GameColumn = (props: GameColumnProps) => (
  <div className={styles.columnBox} onClick={() => props.onClick(props.index)}>
    <div className={styles.topCircle + " " + styles[props.currentColor]}></div>
    <GameRow circleColor={props.rowValues[5]} />
    <GameRow circleColor={props.rowValues[4]} />
    <GameRow circleColor={props.rowValues[3]} />
    <GameRow circleColor={props.rowValues[2]} />
    <GameRow circleColor={props.rowValues[1]} />
    <GameRow circleColor={props.rowValues[0]} />
  </div>
);

export default GameColumn;
