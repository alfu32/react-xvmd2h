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
  const states = props.workflow.reduce((s, i) => {
    s[i.from] = s[i.from] || { next: [], prev: [] };
    s[i.to] = s[i.to] || { next: [], prev: [] };
    s[i.to].prev = s[i.to].prev.concat(i.from);
    s[i.from].next = s[i.from].next.concat(i.to);
    return s;
  }, {});
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
                    if (states[state].next.length === 0) {
                      return <KanbanCard task={task} />;
                    }
                    const model = states[state].next.map(to => ({
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
