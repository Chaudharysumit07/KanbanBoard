import Navbar from "./components/Navbar";
import Body from "./components/Body";
import "./App.css";

import React, { useEffect, useState } from "react";
import {
  sortTicketsByPriorityDescending,
  groupTicketsByStatus,
  groupTicketsByUser,
  groupTicketsByPriority,
  sortTicketsWithinGroupsByPriorityDescending,
  sortTicketsWithinGroupsByTitleAscending
} from "./components/utils/sortAndGroupFunctions";

// import KanbanBoard from './components/KanbanBoard';

function App() {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});
  const [grouping, setGrouping] = useState("status"); // default grouping
  const [sortMethod, setSortMethod] = useState('priority');

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
    // Function to sort tickets based on the current method
    const sortTickets = () => {
      switch (sortMethod) {
        case 'priority':
          return sortTicketsWithinGroupsByPriorityDescending(groupedTickets);
        case 'title':
          return sortTicketsWithinGroupsByTitleAscending(groupedTickets);
        default:
          return groupedTickets;
      }
    };
  
    // Call the sorting function and update state
    const sortedGroupedTickets = sortTickets();
    
    // Only update state if sorted tickets are different from current state to prevent infinite loop
    if (sortedGroupedTickets !== groupedTickets) {
      setGroupedTickets(sortedGroupedTickets);
    }
  }, [sortMethod]); // Removed groupedTickets from dependency array



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

  const groupByHandleFunctionFromChild = (parameter) => {
    // Do something with the parameter
    console.log(`Received parameter from child: ${parameter}`);
    setGrouping(parameter);

  };

  const orderByHandleFunctionFromChild = (parameter) => {
    // Do something with the parameter
    console.log(`Received parameter from child: ${parameter}`);
    setSortMethod(parameter);

  };

  return (
    <div >
      <Navbar groupByFunction={groupByHandleFunctionFromChild}  orderByFunction={orderByHandleFunctionFromChild}/>
      <Body  groupedTickets={groupedTickets}  Users={users}/>
    </div>
  );
}

export default App;
