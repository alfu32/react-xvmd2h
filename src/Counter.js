import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';

export const Counter = props => {
  const [counter, setCounter] = useState(0);
  const buttonCssStyle = "p-button-rounded p-button-raised p-button-outlined p-button-secondary";
  const btnCssStyle = 'p-button-text';
  return (
    <tr>
      <td>{props.name}</td>
      <td>{counter}</td>
      <td><Button
        className={btnCssStyle}
        onClick={() => {
          setCounter(counter - 1);
        }}
      >
        -
      </Button></td>
      <td><Button
        className={btnCssStyle}
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        +
      </Button></td>
    </tr>
  );
};
