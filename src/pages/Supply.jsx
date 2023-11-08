import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import FilterButton from '../components/DropdownFilter';
import TotalSupplyChart from '../partials/supply/TotalSupplyChart';
import DoctorSupplyChart from '../partials/supply/DoctorSupplyChart';
import HygieneSupplyChart from '../partials/supply/HygieneSupplyChart';
import PercentSupplyChart from '../partials/supply/PercentSupplyChart';
import Orders from '../partials/supply/Orders';

function Supply() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [supplyData, setSupplyData] = useState([]);
  const [isRendering, setRendering] = useState(false);

  useEffect(() => {
    setRendering(false);
  }, [supplyData]);

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

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
            
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Orders</h1>
              </div>
          
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" />         
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

          <Orders setSupplyData={setSupplyData} setRendering={setRendering} />
        </main>

      </div>

    </div>
  );
}

export default Supply;