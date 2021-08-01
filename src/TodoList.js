import React, { useState, useEffect } from 'react';

export const TodoList = (props) => {
  const [list,setList] = useState([]);
  return (<ul>{
    list.map(item => {
      
      return (<li>

      </li>);
    })
  }</ul>);
}