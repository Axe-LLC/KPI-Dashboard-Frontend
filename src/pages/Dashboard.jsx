import React, { useEffect, useState } from 'react';
import axios from "axios";
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import DateSelect from '../components/DateSelect';
import ClinicSelect from '../components/ClinicSelect';
import ProductionChart from '../partials/metrics/ProductionChart';
import AdjustmentChart from '../partials/metrics/AdjustmentChart';
import CollectionsChart from '../partials/metrics/CollectionsChart';
import AnalyticsByProviderType from '../partials/metrics/AnalyticsByProviderType';
import { SERVER_ADDRESS } from '../utils/Consts';
import { formatRangeDateString, generateMetricsData } from '../utils/Utils';
import AppointmentsChart from '../partials/metrics/AppointmentsChart';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clinics, setClinics] = useState([{id: 0, name: 'All Clinics'}]);
  const [clinic, setClinic] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isRendering, setRendering] = useState(false);
  const [isRenderingApp, setRenderingApp] = useState(false);
  const initialClinics = [{id: 0, name: 'All Clinics'}];
  const [metricsData, setMetricsData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState(null);
  const [isCustomDate, setIsCustomDate] = useState(false);

  useEffect(() => {
    fetchClincs();
    const date = new Date();
    setEndDate(formatRangeDateString(date, false));
    const start = new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/01'); 
    setStartDate(formatRangeDateString(start, true));
  }, []);

  useEffect(() => {
    if(startDate && endDate) {
      fetchOfficeFinance();
      fetchAppointments();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setRendering(false);
  }, [metricsData, clinic]);

  useEffect(() => {
    setRenderingApp(false);
  }, [appointmentsData, clinic]);

  useEffect(() => {
    if(startDate && endDate) {
      fetchOfficeFinance();
      fetchAppointments();
    }
  }, [clinic])

  const fetchClincs = () => {
    axios.get(`${SERVER_ADDRESS}/clinics`).then((res) => setClinics(initialClinics.concat(res.data.data[0][1])));
  }

  const fetchOfficeFinance = () => {
    setRendering(true);
    axios.get(`${SERVER_ADDRESS}/office_finances/${clinic}`, { params: { start: startDate, end: endDate } }).then((res) => {
      setMetricsData(res.data.data);
    });
  }

  const fetchAppointments = () => {
    setRenderingApp(true);
    axios.get(`${SERVER_ADDRESS}/appointment/${clinic}`, { params: { start: startDate, end: endDate } }).then((res) => {
      setAppointmentsData(res.data);
    });
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <button
          className="text-slate-500 hover:text-slate-600 lg:hidden burger-button"
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="5" width="16" height="2" />
            <rect x="4" y="11" width="16" height="2" />
            <rect x="4" y="17" width="16" height="2" />
          </svg>
        </button>

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            {/* <WelcomeBanner /> */}

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-6 top-header">

              <div className="mb-4 sm:mb-3">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Office Metrics</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid xl:grid-flow-col lg:grid-cols sm:auto-cols-max justify-start sm:justify-end gap-2">
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
              <ProductionChart metricsData={metricsData} isRendering={isRendering} />
              {/* Line chart (Acme Advanced) */}
              <AdjustmentChart metricsData={metricsData} isRendering={isRendering} />
              {/* Line chart (Acme Professional) */}
              <CollectionsChart metricsData={metricsData} isRendering={isRendering} />
              {/* Bar chart (Direct vs Indirect) */}
              <AnalyticsByProviderType metricsData={metricsData} startDate={startDate} endDate={endDate} clinic={clinic} outerRendering={isRendering}/>
              {/* Line chart (Real Time Value) */}
              <AppointmentsChart appointmentsData={appointmentsData} isRendering={isRenderingApp}/>              
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default Dashboard;