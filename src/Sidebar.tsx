import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file
import { FaHome, FaInfo, FaList, FaUser, FaPhone } from 'react-icons/fa'; // Import Font Awesome icons

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/about">
              <FaInfo /> About
            </Link>
          </li>
          <li onClick={handleToggle} className="">
            <span style={{ cursor: 'pointer' }}>
              <FaList /> Campaign
            </span>
            {isExpanded && (
              <ul>
                <li>
                  {/* <Link to="/dashboard/category1"><FaCircle /> Created campaign</Link> */}
                </li>
                <li>
                  <Link to="/dashboard/category2">
                    <FaUser /> User Registered
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/dashboard/contact">
              <FaPhone /> Contact
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
