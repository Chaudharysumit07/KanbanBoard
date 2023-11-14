import React from 'react';
import KanbanColumn from './Body/KanbanColumn' ;
import "./Body.css" ;



function Body({ groupedTickets }) {
  // console.log("^")
  // console.log(groupedTickets)
    return (
      <div className="body">
        {Object.keys(groupedTickets).map((groupName) => (
        
          <KanbanColumn key={groupName} title={groupName} tickets={groupedTickets[groupName]} />
          
        ))}
        
      </div>

    // <div className='body'>
    //     Hello Body
    // </div>
    );
  }
  
  export default Body;