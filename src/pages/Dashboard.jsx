import React, { useEffect, useState } from 'react';
import axios from "axios";
import Sidebar from '../partials/Sidebar';
import Datepicker from '../components/Datepicker';
import DateSelect from '../components/DateSelect';
import ClinicSelect from '../components/ClinicSelect';
import ProductionChart from '../partials/metrics/ProductionChart';
import AdjustmentChart from '../partials/metrics/AdjustmentChart';
import CollectionsChart from '../partials/metrics/CollectionsChart';
import AnalyticsByProviderType from '../partials/metrics/AnalyticsByProviderType';
import AnalyticsCard02 from '../partials/analytics/AnalyticsCard02';
import { SERVER_ADDRESS } from '../utils/Consts';
import { formatRangeDateString, generateMetricsData } from '../utils/Utils';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clinics, setClinics] = useState([{id: 0, name: 'All Clinics'}]);
  const [clinic, setClinic] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isRendering, setRendering] = useState(false);
  const initialClinics = [{id: 0, name: 'All Clinics'}];
  const [metricsData, setMetricsData] = useState([]);
  const [isCustomDate, setIsCustomDate] = useState(false);

  useEffect(() => {
    fetchClincs();
    const date = new Date();
    setEndDate(formatRangeDateString(date, false));
    const start = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-01'); 
    setStartDate(formatRangeDateString(start, true));
  }, []);

  useEffect(() => {
    if(startDate && endDate) {
      fetchOfficeFinance();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setRendering(false);
  }, [metricsData, clinic]);

  const fetchClincs = () => {
    axios.get(`${SERVER_ADDRESS}/clinics`).then((res) => setClinics(initialClinics.concat(res.data.data[0][1])));
  }

  const fetchOfficeFinance = () => {
    setRendering(true);
    axios.get(`${SERVER_ADDRESS}/office_finances`, { params: { start: startDate, end: endDate } }).then((res) => {
      setMetricsData(res.data.data);
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
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Office Metrics</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <ClinicSelect options={clinics} setClinic={setClinic} setRendering={setRendering} />
                {/* Dropdown */}
                <DateSelect setStartDate={setStartDate} setEndDate={setEndDate} isCustomDate={isCustomDate} setIsCustomDate={setIsCustomDate} />  
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" setStartDate={setStartDate} setEndDate={setEndDate} start={startDate} end={endDate} setIsCustomDate={setIsCustomDate} />  
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Acme Plus) */}
              <ProductionChart metricsData={generateMetricsData(metricsData, startDate, endDate, clinic)} isRendering={isRendering} />
              {/* Line chart (Acme Advanced) */}
              <AdjustmentChart metricsData={generateMetricsData(metricsData, startDate, endDate, clinic)} isRendering={isRendering} />
              {/* Line chart (Acme Professional) */}
              <CollectionsChart metricsData={generateMetricsData(metricsData, startDate, endDate, clinic)} isRendering={isRendering} />
              {/* Bar chart (Direct vs Indirect) */}
              <AnalyticsByProviderType />
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