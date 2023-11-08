import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import FilterButton from '../components/DropdownFilter';
import Staffs from '../partials/staff/Staffs';
import RoleStaffChart from '../partials/staff/RoleStaffChart';
import TypeStaffChart from '../partials/staff/TypeStaffChart';

function Staff() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [staffData, setStaffData] = useState([]);
  const [isRendering, setRendering] = useState(false);

  useEffect(() => {
    setRendering(false);
  }, [staffData]);

  return (
    <div className='flex h-[100dvh] overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Team</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" />
                {/* Add view button */}             
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              <RoleStaffChart data={staffData} isRendering={isRendering} />
              <TypeStaffChart data={staffData} isRendering={isRendering} />

            </div>
          </div>

          <Staffs setStaffData={setStaffData} setRendering={setRendering} />
        </main>
      </div>
    </div>
  );
}

export default Staff;