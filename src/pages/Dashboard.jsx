import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import FintechCard09 from '../partials/fintech/FintechCard09';
import FintechCard07 from '../partials/fintech/FintechCard07';
import FintechCard08 from '../partials/fintech/FintechCard08';
import AnalyticsCard01 from '../partials/analytics/AnalyticsCard01';
import AnalyticsCard02 from '../partials/analytics/AnalyticsCard02';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Metrics</h1>
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