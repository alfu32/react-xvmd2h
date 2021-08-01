import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';

export const Counter = props => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <span>{props.name}</span>
      <span>{counter}</span>
      <Button
        onClick={() => {
          setCounter(counter - 1);
        }}
      >
        -
      </Button>
      <Button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        +
      </Button>
    </div>
  );
};
