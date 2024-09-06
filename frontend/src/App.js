// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import CustomerUpdate from "./components/CustomerUpdate";
import SearchFilter from "./components/SearchFilter";
import Header from "./components/Header";
import "./App.css";
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customer/new" element={<CustomerForm />} />
          <Route path="/customer/:id" element={<CustomerDetails />} />
          <Route path="/customer/:id/update" element={<CustomerUpdate />} />
          <Route path="/search" element={<SearchFilter />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
