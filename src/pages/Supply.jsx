import React, { useEffect, useState } from 'react';
import axios from "axios";
import Sidebar from '../partials/Sidebar';
import Datepicker from '../components/Datepicker';
import DateSelect from '../components/DateSelect';
import ClinicSelect from '../components/ClinicSelect';
import TotalSupplyChart from '../partials/supply/TotalSupplyChart';
import DoctorSupplyChart from '../partials/supply/DoctorSupplyChart';
import HygieneSupplyChart from '../partials/supply/HygieneSupplyChart';
import PercentSupplyChart from '../partials/supply/PercentSupplyChart';
import Orders from '../partials/supply/Orders';
import AddOrderModal from '../partials/supply/Orders/AddOrderModal';
import { getCurrentMonthDays } from '../utils/Utils';
import { STAFF_TYPE_TOTAL, STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE, SERVER_ADDRESS } from "../utils/Consts";

function Supply() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [supplyData, setSupplyData] = useState([]);
  const [isRendering, setRendering] = useState(false);
  const [clinics, setClinics] = useState([{id: 0, name: 'All Clinics'}]);
  const initialClinics = [{id: 0, name: 'All Clinics'}];
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setRendering(false);
  }, [supplyData]);

  useEffect(() => {
    fetchOrders();
    fetchClincs();
  }, []);

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
    axios.get(`${SERVER_ADDRESS}/clinics`).then((res) => setClinics(initialClinics.concat(res.data.data[0][1])));
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto pt-8">

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-6">
            
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Orders</h1>
              </div>
          
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <ClinicSelect options={clinics} />   
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" />
                {/* Dropdown */}
                <DateSelect />   
                {/* Add order button */}
                <AddOrderModal clinics={clinics} fetchOrders={fetchOrders} />
              </div>
            
            </div>            
            
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <TotalSupplyChart data={supplyData} isRendering={isRendering} />
              <DoctorSupplyChart data={supplyData} isRendering={isRendering} />
              <HygieneSupplyChart data={supplyData} isRendering={isRendering} />
              <PercentSupplyChart data={supplyData} isRendering={isRendering} />

            </div>

          </div>

          <Orders clinics={clinics} orders={orders} fetchOrders={fetchOrders} />
        </main>

      </div>

    </div>
  );
}

export default Supply;