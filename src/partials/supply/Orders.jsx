import { useState, useEffect } from "react";
import axios from "axios";
import DeleteButton from "../actions/DeleteButton";
import DateSelect from "../../components/DateSelect";
import FilterButton from '../../components/DropdownFilter';
import OrdersTable from "./Orders/OrdersTable";
import PaginationClassic from "../../components/PaginationClassic";
import AddOrderModal from "./Orders/AddOrderModal";

function Orders({clinics, orders, fetchOrders}) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  const handleDelete = () => {
    axios.delete(`${SERVER_ADDRESS}/orders`, {
      headers: {},
      data: selectedItems
    }).then((res) => {
      fetchOrders();
      setSelectedItems([]);
    })
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          {/* <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Orders ✨</h1> */}
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <DeleteButton selectedItems={selectedItems} handleDelete={handleDelete}/>
          {/* Dropdown */}
          {/* <DateSelect /> */}
          {/* Filter button */}
          {/* <FilterButton align="right" /> */}
        </div>

      </div>

      {/* Table */}
      <OrdersTable selectedItems={handleSelectedItems} orders={orders} clinics={clinics} fetchOrders={fetchOrders} />

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic />
      </div>

    </div>)
}

export default Orders;