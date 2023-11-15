// import { useState } from "react";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar({ callbackFunction }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown visibility
  };

  // useEffect(() => {
  //   // You can perform additional actions when showDropdown or selectedValue changes
  //   // console.log(`Dropdown visibility: ${showDropdown}`);
  //   // console.log(`Selected value: ${selectedValue}`);
  // }, [showDropdown]);

  const [selectedValue, setSelectedValue] = useState("status");

  const handleDropdownChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    setShowDropdown(false);
  };

  useEffect(() => {
    // Call the callback function with the selected value when it changes
    callbackFunction(selectedValue);
  }, [callbackFunction, selectedValue, showDropdown]);

  return (
    <div className="nav-container">
      <div class="navbar">
        <button class="button" onClick={handleButtonClick}>
          Display
        </button>
      </div>

      {/* {showDropdown && ( */}
        <div className="dropDownMenu">
          <ul>
            <li>
              Group By
              <select
                id="groupby"
                value={selectedValue}
                onChange={handleDropdownChange}
              >
                <option value="status">Status</option>
                <option value="priority">Priority</option>
                <option value="user">Users</option>
              </select>
            </li>
            <li>
              Order By
              <select id="orderby">
                <option value="1">Title</option>
                <option value="2">Priority</option>
              </select>
            </li>
          </ul>
        </div>
    
    </div>
  );
}

export default Navbar;
