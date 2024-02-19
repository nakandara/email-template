import React from "react";
import { Link } from 'react-router-dom';
import "./Layout.css"

const Footer = () => {
  return (
    <div>
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>About Us</h3>
            <p>
            Founded in 2010, XYZ Tech Solutions emerged from a small garage where a group of passionate innovators envisioned a future driven by technology. Frustrated by the limitations they encountered, they set out to create solutions that would not only address current challenges but also pave the way for a more connected and efficient world.
            </p>
          </div>
          <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
          
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
           
            <li>
              <Link to="/post">Payment Plane</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>Email: Template@example.com</p>
            <p>Phone: +94715297881</p>
          </div>
        </div>
      </footer>
      <div
        style={{
          backgroundColor: "#333",
          padding: "20px",
          color: "#fff",
          textAlign: "center",
        }}
      >
     &copy; {new Date().getFullYear()}  Effito Solution. LTD. All Rights Reserved.

      </div>
    </div>
  );
};

export default Footer;
