import React, { useState } from "react";
// import styled from "styled-components";

import styles from "../styles/styles.css";

// const Circle = styled.div`
//   border: 10px solid black;
//   border-radius: 5%;
// `;

const GameCircle = ({ id, className, onCircleClick, children }) => {
  const [isColored, setIsColored] = useState(false);

  return (
    <>
      <div
        className={`gameCircle ${className}`}
        onClick={() => onCircleClick(id)}
      >
        {children}
      </div>
    </>
  );
};

export default GameCircle;
