import Navbar from "./components/Navbar";
import Body from "./components/Body";
import "./App.css";

import React, { useEffect, useState } from "react";
import {
  sortTicketsByPriorityDescending,
  groupTicketsByStatus,
  groupTicketsByUser,
  groupTicketsByPriority,
} from "./components/utils/sortAndGroupFunctions";

// import KanbanBoard from './components/KanbanBoard';

function App() {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});
  const [grouping, setGrouping] = useState("status"); // default grouping

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Raw data:", data); // First, log the raw data
        setUsers(data.users);
        setTickets(data.tickets);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    let grouped;
    switch (grouping) {
      case "status":
        grouped = groupTicketsByStatus(tickets);
        break;
      case "user":
        grouped = groupTicketsByUser(tickets, users); // Assuming 'users' is fetched or defined somewhere
        console.log(users);
        break;
      case "priority":
        grouped = groupTicketsByPriority(tickets);
        break;
      default:
        grouped = { "All Tickets": sortTicketsByPriorityDescending(tickets) };
    }

    setGroupedTickets(grouped);
  }, [tickets, grouping, users]); // Re-run this effect when tickets or grouping changes

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  useEffect(() => {
    const savedGrouping = localStorage.getItem("grouping");
    if (savedGrouping) {
      setGrouping(savedGrouping);
    }
  }, []);

  // console.log("1")
  // console.log(groupedTickets)

  const handleFunctionFromChild = (parameter) => {
    // Do something with the parameter
    console.log(`Received parameter from child: ${parameter}`);
    setGrouping(parameter);

  };

  return (
    <div  >
      <Navbar callbackFunction={handleFunctionFromChild}/>
      {/* <Body/> */}
      <Body  groupedTickets={groupedTickets} />
    </div>
  );
}

export default App;
