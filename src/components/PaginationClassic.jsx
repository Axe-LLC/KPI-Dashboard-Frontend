import React from 'react';

function PaginationClassic({page, count, handleNext, handlePrev, perPage}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <a className={`${page !== 0 && 'primary-button cursor-pointer'} btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${page === 0 ? 'text-slate-300 dark:text-slate-600' : 'hover:border-slate-300 dark:hover:border-slate-600'}`} onClick={() => {
              if(page !== 0) handlePrev();
            }}>&lt;- Previous</a>
          </li>
          <li className="ml-3 first:ml-0">
            <a className={`btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${count - (page + 1) * perPage > 0 ? 'hover:border-slate-300 dark:hover:border-slate-600' : 'text-slate-300 dark:text-slate-600'} ${count - (page + 1) * perPage > 0 && 'primary-button cursor-pointer'}`} onClick={() => {
              if(count - (page + 1) * perPage > 0) handleNext();
            }}>Next -&gt;</a>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
        Showing <span className="font-medium text-slate-600 dark:text-slate-300">{count === 0 ? 0 : page * perPage + 1}</span> to <span className="font-medium text-slate-600 dark:text-slate-300">{page * perPage + (count - (page + 1) * perPage > 0 ? perPage : count - page * perPage)}</span> of <span className="font-medium text-slate-600 dark:text-slate-300">{count}</span> results
      </div>
    </div>
  );
}

export default PaginationClassic;
