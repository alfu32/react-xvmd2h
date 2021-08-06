import React, { useState, useEffect, useRef } from 'react';
import './KanbanCard.css';

export const KanbanCard = ({ task, children }) => {
  return (
    <div className="task kanban-card">
      <h5>
        #{task.id} {task.title}
      </h5>
      <div>{task.description}</div>
      <div>{children}</div>
    </div>
  );
};
