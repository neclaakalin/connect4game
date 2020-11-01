import React from "react";
import styles from "./GameRow.module.scss";

interface GameRowProps {
  circleColor?: "red" | "yellow" | undefined;
}

const GameRow = (props: GameRowProps) => {
  const colorStyle = props.circleColor ? styles[props.circleColor] : "";

  return (
    <div className={styles.rowBox}>
      <div className={styles.circle + " " + colorStyle}></div>
    </div>
  );
};

export default GameRow;
