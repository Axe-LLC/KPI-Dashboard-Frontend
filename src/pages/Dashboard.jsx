import React, { useEffect, useState } from 'react';
import axios from "axios";
import Sidebar from '../partials/Sidebar';
import Datepicker from '../components/Datepicker';
import DateSelect from '../components/DateSelect';
import ClinicSelect from '../components/ClinicSelect';
import FintechCard09 from '../partials/fintech/FintechCard09';
import FintechCard07 from '../partials/fintech/FintechCard07';
import FintechCard08 from '../partials/fintech/FintechCard08';
import AnalyticsCard01 from '../partials/analytics/AnalyticsCard01';
import AnalyticsCard02 from '../partials/analytics/AnalyticsCard02';
import { SERVER_ADDRESS } from '../utils/Consts';
import { formatRangeDateString, generateMetricsData } from '../utils/Utils';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clinics, setClinics] = useState([{id: 0, name: 'All Clinics'}]);
  const [clinic, setClinic] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const initialClinics = [{id: 0, name: 'All Clinics'}];

  useEffect(() => {
    fetchClincs();
    let date = new Date();
    setEndDate(formatRangeDateString(date, false));
    date.setMonth(date.getMonth()-1);
    setStartDate(formatRangeDateString(date, true));
  }, []);

  useEffect(() => {
    if(startDate && endDate) {
      fetchOfficeFinance();
      console.log(startDate, endDate);
    }
  }, [startDate, endDate]);

  const fetchClincs = () => {
    axios.get(`${SERVER_ADDRESS}/clinics`).then((res) => setClinics(initialClinics.concat(res.data.data[0][1])));
  }

  const fetchOfficeFinance = () => {
    axios.get(`${SERVER_ADDRESS}/office_finances`, { params: { start: startDate, end: endDate } }).then((res) => {
      console.log(res.data.data[0][1])
      generateMetricsData(res.data.data[0][1], startDate, endDate, clinic);
    });
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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            {/* <WelcomeBanner /> */}

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-6">

              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Metrics</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <ClinicSelect options={clinics} setClinic={setClinic} />
                {/* Dropdown */}
                <DateSelect setStartDate={setStartDate} setEndDate={setEndDate} />  
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" setStartDate={setStartDate} setEndDate={setEndDate} />  
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Acme Plus) */}
              <FintechCard09 />
              {/* Line chart (Acme Advanced) */}
              <FintechCard07 />
              {/* Line chart (Acme Professional) */}
              <FintechCard08 />
              {/* Bar chart (Direct vs Indirect) */}
              <AnalyticsCard01 />
              {/* Line chart (Real Time Value) */}
              <AnalyticsCard02 />              
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default Dashboard;