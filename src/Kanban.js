import React, { useState, useEffect } from 'react';
import './Kanban.css';

export const Kanban = (props) => {
  const [boardId,setBoardId] = useState(0);
  const states = props.workflow.reduce((s,i)=>{
    s[i.from]=true;
    s[i.to]=true;
    return s;
  },{})
  return (<>
    <h4>{props.title} Board</h4>
    <div className="lanes">
    {Object.keys(states).map(state => {
      return (<div className="lane">
        <h4>{state}</h4>
        <div className="list">

        </div>
      </div>)
    })}
    </div>
  </>)
}