import React from 'react';
import KanbanCard from './KanbanCard';

function KanbanColumn({ title, tickets }) {
  // console.log("^")
  // console.log(tickets)
  return (
    <div className="kanban-column">
      <h2>{title}</h2>
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