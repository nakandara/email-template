import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './Sidebar';
import DashboardHome from "./components/Home";
import  DashboardSelectEvents from "./components/SelectEvents";
import  Category1 from "./components/category/category1";
import  Category2 from "./components/category/Category2";

function App() {
  return (
    <Router>
    <div style={{ display: 'flex'}}  >
      <Sidebar  />
      <div style={{ flex: 1 ,border: '1px solid #ccc',marginLeft:"300px"}}>
        <Routes>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/about" element={<DashboardSelectEvents />} />
          <Route path="/dashboard/category1" element={<Category1 />} />
          <Route path="/dashboard/category2" element={<Category2 />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
