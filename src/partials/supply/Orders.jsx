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
  const [page, setPage] = useState(0);
  const perPage = 10;

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  useEffect(() => {
    setPage(0);
  }, [orders])

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
    <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mt-4 mb-2">

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
      <OrdersTable
        count={orders.length}
        selectedItems={handleSelectedItems}
        orders={orders.slice(page * perPage, page * perPage + (orders.length - (page + 1) * perPage > 0 ? perPage : orders.length - page * perPage))}
        clinics={clinics}
        fetchOrders={fetchOrders}
      />

      {/* Pagination */}
      <div className="mt-8 mb-8">
        <PaginationClassic page={page} count={orders.length} handleNext={() => setPage(page + 1)} handlePrev={() => setPage(page - 1)} perPage={perPage}/>
      </div>

    </div>)
}

export default Orders;