import React, { useState, useEffect } from 'react';
import {SplitButton} from 'primereact/splitbutton';
import { ContextMenu } from 'primereact/contextmenu';
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
    s[i.from] = (s[i.from]||[]).concat([i.to]);
    return s;
  }, {});
  const transitionTask = (item,toState) => {
    item.state = toState;
    setTaskList([...taskList]);
  };
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
              <pre>{JSON.stringify(states[state])}</pre>
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
                    const model = states[state].map(to => ({
                      label:to,
                      command:(e) => {
                        transitionTask(task,to);
                      }
                    }))
                    return (
                      <div className="task">
                        <h5>
                          #{task.id} {task.title}
                          <ContextMenu label={model[0].label} model={model} />
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
