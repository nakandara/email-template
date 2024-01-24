import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './Sidebar';
import DashboardHome from "./components/Home";
import  DashboardSelectEvents from "./components/SelectEvents";
import  Category1 from "./components/category/category1";
import  Category2 from "./components/category/Category2";
import DrawerAppBar from "./components/layout/DrawerAppBar";


function App() {
  return (
    <Router>
    <div   >
    
    <DrawerAppBar/>
      {/* <Sidebar  /> */}
      <div >
        {/* <Routes>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/about" element={<DashboardSelectEvents />} />
          <Route path="/dashboard/category1" element={<Category1 />} />
          <Route path="/dashboard/category2" element={<Category2 />} />
        </Routes> */}
      </div>
    </div>
  </Router>
  );
}

export default App;
