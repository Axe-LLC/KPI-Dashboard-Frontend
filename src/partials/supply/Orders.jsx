import { useState, useEffect } from "react";
import axios from "axios";
import DeleteButton from "../actions/DeleteButton";
import DateSelect from "../../components/DateSelect";
import FilterButton from '../../components/DropdownFilter';
import OrdersTable from "./Orders/OrdersTable";
import PaginationClassic from "../../components/PaginationClassic";
import AddOrderModal from "./Orders/AddOrderModal";
import { getCurrentMonthDays } from "../../utils/Utils";
import { STAFF_TYPE_TOTAL, STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE, SERVER_ADDRESS } from "../../utils/Consts";

function Orders({setSupplyData, setRendering}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    setRendering(true);
    axios.get(`${SERVER_ADDRESS}/order`).then((res) => {
      let dayArray = getCurrentMonthDays();
      setOrders(res.data);
      for (let i=0; i<res.data.length; i++) {
        let data = dayArray[res.data[i].date];
        data[STAFF_TYPE_TOTAL] += res.data[i].total;

        if (res.data[i].type === STAFF_TYPE_DOCTOR) {
          data[STAFF_TYPE_DOCTOR] += res.data[i].total;
        }
        else {
          data[STAFF_TYPE_HYGIENE] += res.data[i].total;
        }

        dayArray[res.data[i].date] = data;
      }
      setSupplyData(dayArray);
    });
  }

  const fetchClincs = () => {
    axios.get(`${SERVER_ADDRESS}/clinics`).then((res) => setClinics(res.data.data[0][1]));
  }

  useEffect(() => {
    fetchOrders();
    fetchClincs();
  }, []);
  

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Orders ✨</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <DeleteButton selectedItems={selectedItems} />
          {/* Dropdown */}
          <DateSelect />
          {/* Filter button */}
          <FilterButton align="right" />
          {/* Add order button */}
          <AddOrderModal clinics={clinics} fetchOrders={fetchOrders} />
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