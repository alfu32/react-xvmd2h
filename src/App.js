import React from 'react';
import './style.css';
import {Counter} from './Counter';
import {TodoList} from './TodoList';

export default function App() {
  return (
    <div>
      <Counter name='coucou'/>
      <Counter name='coucou2'/>
      <TodoList/>
    </div>
  );
}
