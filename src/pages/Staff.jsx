import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import axios from "axios";
import Datepicker from '../components/Datepicker';
import DateSelect from '../components/DateSelect';
import ClinicSelect from '../components/ClinicSelect';
import Staffs from '../partials/staff/Staffs';
import RoleStaffChart from '../partials/staff/RoleStaffChart';
import TypeStaffChart from '../partials/staff/TypeStaffChart';
import AddStaffModal from '../partials/staff/Staffs/AddStaffModal';
import { getFilteredDays, formatRangeDateString } from "../utils/Utils";
import { EMPLOYEE_STATUS_FULL_TIME, EMPLOYEE_STATUS_PART_TIME, SERVER_ADDRESS, STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE } from "../utils/Consts";

function Staff() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [staffData, setStaffData] = useState([]);
  const [isRendering, setRendering] = useState(false);
  const [clinics, setClinics] = useState([{id: 0, name: 'All Clinics'}]);
  const [clinic, setClinic] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const initialClinics = [{id: 0, name: 'All Clinics'}];
  const [staffs, setStaffs] = useState([]);
  const [isCustomDate, setIsCustomDate] = useState(false);

  useEffect(() => {
    setRendering(false);
  }, [staffData, isCustomDate]);

  useEffect(() => {
    fetchClincs();
    const date = new Date();
    setEndDate(formatRangeDateString(date, false));
    const start = new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/01'); 
    setStartDate(formatRangeDateString(start, true));
  }, []);

  useEffect(() => {
    if(startDate && endDate) {
      fetchStaffs();
    }
  }, [startDate, endDate, clinic]);

  const fetchStaffs = () => {
    setRendering(true);
    axios.get(`${SERVER_ADDRESS}/team`, { params: { start: startDate, end: endDate } }).then((res) => {
      let dayArray = getFilteredDays(startDate, endDate);
      const filteredDataByClinic = clinic !== 0 ? res.data.filter(d => d.clinic == clinic) : res.data;
      setStaffs(filteredDataByClinic);
      for (let i=0; i<filteredDataByClinic.length; i++) {
        let data = dayArray[filteredDataByClinic[i].start_date];
        if(data) {
          if (filteredDataByClinic[i].role === STAFF_TYPE_DOCTOR) {
            data[STAFF_TYPE_DOCTOR] += filteredDataByClinic[i].hours;
          }
          else {
            data[STAFF_TYPE_HYGIENE] += filteredDataByClinic[i].hours;
          }
  
          if (filteredDataByClinic[i].employee_status === EMPLOYEE_STATUS_FULL_TIME) {
            data[EMPLOYEE_STATUS_FULL_TIME] += filteredDataByClinic[i].hours;
          }
          else {
            data[EMPLOYEE_STATUS_PART_TIME] += filteredDataByClinic[i].hours;
          }
  
          dayArray[filteredDataByClinic[i].start_date] = data;
        }
      }
      setStaffData(dayArray);
    });
  }

  const fetchClincs = () => {
    axios.get(`${SERVER_ADDRESS}/clinics`).then((res) => setClinics(initialClinics.concat(res.data.data[0][1])));
  }

  return (
    <div className='flex h-[100dvh] overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto pt-8">

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-6 top-header">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-3">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Staff Count</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid xl:grid-flow-col lg:grid-cols sm:auto-cols-max justify-start sm:justify-end gap-2">
                <ClinicSelect options={clinics} setClinic={setClinic} setRendering={setRendering} />
                {/* Dropdown */}
                <DateSelect setStartDate={setStartDate} setEndDate={setEndDate} isCustomDate={isCustomDate} setIsCustomDate={setIsCustomDate} />  
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" setStartDate={setStartDate} setEndDate={setEndDate} start={startDate} end={endDate} setIsCustomDate={setIsCustomDate} /> 
                {/* Add order button */}
                <AddStaffModal clinics={clinics} fetchStaffs={fetchStaffs} />          
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              <RoleStaffChart data={staffData} isRendering={isRendering} />
              <TypeStaffChart data={staffData} isRendering={isRendering} />

            </div>
          </div>

          <Staffs clinics={clinics} staffs={staffs} fetchStaffs={fetchStaffs} />
        </main>
      </div>
    </div>
  );
}

export default Staff;