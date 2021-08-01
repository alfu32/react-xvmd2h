import React from 'react';
import './style.css';
import {Counter} from './Counter';
import {TodoList} from './TodoList';
import {Kanban} from './Kanban';

export const App = () => {
  const kanbanTransitions=[
    {from:"open",to:"todo"},
    {from:"todo",to:"progress"},
    {from:"progress",to:"done"},
    {from:"done",to:"test"},
    {from:"test",to:"closed"},
  ];
  return (
    <div>
      {/*<Counter name='coucou'/>
      <Counter name='coucou2'/>
      <TodoList/>*/}
      <Kanban workflow={kanbanTransitions} />
    </div>
  );
}
