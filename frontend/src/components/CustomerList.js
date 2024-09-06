import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./CustomerList.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`/api/customers?page=${page + 1}`);
        setCustomers(response.data.customers);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };

    fetchCustomers();
  }, [page]);

  const handlePageClick = ({ selected }) => {
    setPage(selected);
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`/api/customers/${id}`);
      const response = await axios.get(`/api/customers/?page=${page + 1}`);
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="customer-list-container">
      <h1 className="customer-list-title">Customer List</h1>
      <ul className="customer-list">
        {customers.map((customer) => (
          <li key={customer.id} className="customer-item">
            <Link to={`/customer/${customer.id}`} className="customer-link">
              {customer.firstName} {customer.lastName}
            </Link>
            <button
              className="delete-button"
              onClick={() => deleteCustomer(customer.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName={"pagination-container"}
        pageClassName={"pagination-page"}
        activeClassName={"pagination-active"}
        previousClassName={"pagination-prev"}
        nextClassName={"pagination-next"}
        disabledClassName={"pagination-disabled"}
      />
    </div>
  );
};

export default CustomerList;
