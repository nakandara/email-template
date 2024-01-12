import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file

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
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/about">About</Link>
          </li>
          <li onClick={handleToggle} className="category-toggle">
            <span style={{ cursor: 'pointer' }}>Categories</span>
            {isExpanded && (
              <ul>
                <li>
                  <Link to="/dashboard/category1">Category 1</Link>
                </li>
                <li>
                  <Link to="/dashboard/category2">Category 2</Link>
                </li>
                
              </ul>
            )}
          </li>
          <li>
            <Link to="/dashboard/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
