import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

let sequence = 1;
const getNewItem = () => {
  return {
    id:sequence++,
    checked: "todo",
    text: 'new item'
  };
};
const btnCssStyle = 'p-button-text';

export const TodoList = props => {
  const [list, setList] = useState([]);
  const setChecked = (item,status) => {
    item.checked = status;
    setList([...list]);
  };
  const setItemText = (item,e) => {
    console.log(e)
    item.text = e.target.value;
    setList([...list]);
  };
  return (
    <div>
      <div>To Do List </div>
      <Button
        className={btnCssStyle}
        onClick={() => {
          setList([...list, getNewItem()]);
        }}
      >
        +
      </Button>
      <h4>Todo</h4>
      <ul>
        {list
        .filter(it => it.checked==="todo")
        .map(item => {
          return (
            <li>
              <span>{item.id}.</span>
              {/**<span>{item.text}</span>**/}
              <input type="text" value={item.text} onChange={(e) => {
                setItemText(item,e);
              }}/>
              <Button
                className={btnCssStyle}
                onClick={() => {
                  setChecked(item,"progress");
                }}
              >
                Start
              </Button>
            </li>
          );
        })}
      </ul>
      <h4>Progress</h4>
      <ul>
        {list
        .filter(it => it.checked==="progress")
        .map(item => {
          return (
            <li>
              <span>{item.id}.</span>
              <span>{item.text}</span>
              <Button
                className={btnCssStyle}
                onClick={() => {
                  setChecked(item,"done");
                }}
              >
                Done
              </Button>
            </li>
          );
        })}
      </ul>
      <h4>Done</h4>
      <ul>
        {list
        .filter(it => it.checked==="done")
        .map(item => {
          return (
            <li>
              <span>{item.id}.</span>
              <span>{item.text}</span>
              <Button
                className={btnCssStyle}
                onClick={() => {
                  setChecked(item,"todo");
                }}
              >
                Todo
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
