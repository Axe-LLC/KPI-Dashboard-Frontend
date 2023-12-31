import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import PaginationNumeric from '../../components/PaginationNumeric';
import PaginationClassic from '../../components/PaginationClassic';
import PaginationNumeric2 from '../../components/PaginationNumeric2';

function PaginationPage() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Pagination ✨</h1>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700">

              {/* Components */}
              <div className="space-y-8 mt-8">

                {/* Option 1 */}
                <div>
                  <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">Option 1</h2>
                  <div className="px-6 py-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
                    <PaginationNumeric />
                  </div>
                </div>

                {/* Option 2 */}
                <div>
                  <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">Option 2</h2>
                  <div className="px-6 py-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
                    <PaginationClassic />
                  </div>
                </div>

                {/* Option 3 */}
                <div>
                  <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-6">Option 3</h2>
                  <div className="px-6 py-8 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
                    <PaginationNumeric2 />
                  </div>
                </div>

              </div>

            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default PaginationPage;