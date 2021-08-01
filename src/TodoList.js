import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

let sequence = 1;
const getNewItem = () => {
  return {
    id:sequence++,
    checked: false,
    text: 'new item'
  };
};
const btnCssStyle = 'p-button-text';

export const TodoList = props => {
  const [list, setList] = useState([]);
  const setChecked = item => {
    item.checked = !item.checked;
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
      <ul>
        {list
        .filter(it => it.checked===false)
        .map(item => {
          return (
            <li>
              <span>{item.id}.</span>
              <Checkbox
                onChange={e => {
                  setChecked(item);
                }}
                checked={item.checked}
              />
              {/**<span>{item.text}</span>**/}
              <input type="text" value={item.text} onChange={(e) => {
                setItemText(item,e);
              }}/>
            </li>
          );
        })}
      </ul>
      <ul>
        {list
        .filter(it => it.checked===true)
        .map(item => {
          return (
            <li>
              <span>{item.id}.</span>
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
