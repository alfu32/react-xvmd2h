import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import './Kanban.css';

let sequence = 0;
const createItem = state => {
  return {
    state,
    id: sequence++,
    title: 'new task',
    description: 'task description',
    createdDate: new Date()
  };
};
const stlBtnAdd = 'p-button-rounded p-button-text p-button-sm';

export const Kanban = props => {
  const [taskList, setTaskList] = useState([]);
  const states = props.workflow.reduce((s, i) => {
    s[i.from] = true;
    s[i.to] = true;
    return s;
  }, {});
  const createTask = state => {
    setTaskList([...taskList, createItem(state)]);
  };
  return (
    <>
      <h4>{props.title} Board</h4>
      <div className="lanes">
        {Object.keys(states).map(state => {
          return (
            <div className="lane">
              <h4>{state}</h4>
              <Button
                icon="pi pi-plus"
                className={stlBtnAdd}
                onClick={() => {
                  createTask(state);
                }}
              />
              <div className="list">
                {taskList
                  .filter(task => task.state === state)
                  .map(task => {
                    return (
                      <div className="task">
                        <h5>
                          #{task.id} {task.title}
                        </h5>
                        <div>{task.description}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
