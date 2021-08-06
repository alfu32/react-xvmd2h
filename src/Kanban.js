import React, { useState, useEffect, useRef } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import { ContextMenu } from 'primereact/contextmenu';
import { Button } from 'primereact/button';
import { KanbanCard } from './KanbanCard';
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
  const states = props.workflow.reduce(
    (s, i) => {
      s.fwd[i.from] = (s.fwd[i.from] || []).concat([i.to]);
      s.rev[i.to] = (s.rev[i.to] || []).concat([i.from]);
      s.map[i.to] = (s.map[i.to] || 0) + 1;
      s.map[i.from] = (s.map[i.from] || 0) + 1;
      return s;
    },
    { fwd: {}, rev: {}, map: {} }
  );
  const transitionTask = (item, toState) => {
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
        {Object.keys(states.map).map(state => {
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
                    if (states.fwd[state] === undefined) {
                      return <KanbanCard task={task} />;
                    }
                    const model = states.fwd[state].map(to => ({
                      label: to,
                      command: e => {
                        transitionTask(task, to);
                      }
                    }));
                    const first = model[0];
                    const rest = model.slice(1);
                    return (
                      <KanbanCard task={task}>
                        <SplitButton
                          label={first.label}
                          onClick={first.command}
                          model={rest}
                        />
                      </KanbanCard>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
      <pre>{JSON.stringify(states, null, ' ')}</pre>
    </>
  );
};
