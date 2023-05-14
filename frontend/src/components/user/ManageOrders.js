import React, { useEffect, useState } from "react";
import app_config from "../../config";

const ManageOrders = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const url = app_config.backend_url;
  const [orderList, setOrderList] = useState([]);

  const fetchUserOrders = async () => {
    const res = await fetch(`${url}/order/getbyuser/${currentUser._id}`);
    const data = await res.json();
    console.log(data);
    setOrderList(data);
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const showOrderData = () => {
    if (orderList.length > 0) {
      return orderList.map((order) => {
        return (
          <tr>
            <td>{order.merch}</td>
            <td>{order.quantity}</td>
            <td>{order.price}</td>
            <td>{order.total}</td>
            <td>{new Date(order.createdat).toLocaleDateString()}</td>
          </tr>
        );
      });
    }
  };

  return (
    <div style={{minHeight: '100vh'}}>
      <div className="container py-5">
        <h1>Manage Orders</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Merch</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>{showOrderData()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
