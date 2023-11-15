import React, { useState } from 'react';
import KanbanCard from './KanbanCard';
import "./KanbanColumn.css";

function KanbanColumn({ title, tickets }) {
const count= tickets.length;
  return (
    <div className="kanban-column">
      {/* <h2>{title}</h2> */}

      <div className="headerCard">
        {/* <img src={path}></img> */}
        <div className='columnName'> {title}</div>
        <div className='ticketCount'>{count}</div>
      </div>
      {
          tickets.map((item, index) => (
            // console.log(item.title)
             
            <KanbanCard key={item.id} 
                  id={item.id}
                  priority={item.priority}
                  status={item.status}
                  tag={item.tag}
                  title={item.title}
                  userId={item.userId} 
            />
        ))}
    </div>
  );
}

export default KanbanColumn;