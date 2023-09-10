import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GrandLayout from "components/GrandLayout";
import Home from "screens/Home";
import AddTask from "screens/AddTask";
import EditTask from "screens/EditTask";
import ViewTask from "screens/ViewTask";

const Routers = () => {
  return (
    <BrowserRouter>
      <GrandLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task" element={<EditTask />} />
          <Route path="/view-task" element={<ViewTask />} />
        </Routes>
      </GrandLayout>
    </BrowserRouter>
  );
};

export default Routers;
