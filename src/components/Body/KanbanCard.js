import React from 'react'
// import '../styleSheets/KanbanCard.css'

function KanbanCard({ id, priority, status, tag, title, userId }) {
  console.log()
  return (
    <>
    <h2></h2>
    <div className="card">
            <div className="card-header">
                <span className="card-id">{id}</span>
                <span className="user-id">{userId}</span>
            </div>
        {/* <div className="card-body"> */}
            {/* <p>Priority: {priority}</p>
            <p>Status: {status}</p>
            <p>Tags: {tag.join(', ')}</p> Assuming 'tag' is an array of strings */}
        {/* </div> */}
        <div className="card-footer">
            <span className="card-title">{title}</span>
        </div>
    </div>
    </>
  )
}

export default KanbanCard