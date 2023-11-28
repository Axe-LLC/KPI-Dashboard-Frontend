import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';
import { formatRangeDateString } from '../utils/Utils';

function DateSelect({setStartDate, setEndDate, isCustomDate, setIsCustomDate}) {

  const options = [
    {
      id: 0,
      period: 'Month to Date'
    },
    {
      id: 1,
      period: 'Today'
    },
    {
      id: 2,
      period: 'Past 7 Days'
    },
    {
      id: 3,
      period: 'Last Month'
    },
    // {
    //   id: 4,
    //   period: 'Last Year'
    // }
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    setDateRange();
  }, [selected])

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setIsCustomDate(false);
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const setDateRange = () => {
    var currentDate = new Date();
    if(selected === 1) {
      setStartDate(formatRangeDateString(new Date(new Date().setDate(new Date().getDate()-1)), true));
      setEndDate(formatRangeDateString(currentDate, false));
    } else if(selected === 2) {
      const lastWeekDate = new Date(currentDate.getTime() 
            - 7 * 24 * 60 * 60 * 1000); 
      setStartDate(formatRangeDateString(lastWeekDate, true));
      setEndDate(formatRangeDateString(currentDate, false));
    } else if(selected === 3) {
      currentDate.setMonth(currentDate.getMonth()-1);
      currentDate.setDate(1);
      setStartDate(formatRangeDateString(currentDate, true));
      const endDate = new Date();
      endDate.setDate(0);
      setEndDate(formatRangeDateString(endDate, false));
    } else if(selected === 4) {
      currentDate = currentDate.setFullYear(currentDate.getFullYear()-1);
      setStartDate(formatRangeDateString(currentDate, true));
      setEndDate(formatRangeDateString(currentDate, false));
    } else if(selected === 0) {
      const start = new Date(currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/01');
      setStartDate(formatRangeDateString(start, true));
      setEndDate(formatRangeDateString(currentDate, false));
    }
  }

  return (
    <div className="relative">
      <button
        ref={trigger}
        className="btn justify-between min-w-44 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 shadow-none w-64"
        aria-label="Select date range"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="flex items-center">
          <svg className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 shrink-0 mr-2" viewBox="0 0 16 16">
            <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
          </svg>
          <span>{isCustomDate ? 'Custom Date Range' : options[selected].period}</span>
        </span>
        <svg className="shrink-0 ml-1 fill-current text-slate-400" width="11" height="7" viewBox="0 0 11 7">
          <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className="z-10 absolute top-full right-0 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded overflow-hidden mt-1"
        enter="transition ease-out duration-100 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          className="font-medium text-sm text-slate-600 dark:text-slate-300"
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          {
            options.map(option => {
              return (
                <button
                  key={option.id}
                  tabIndex="0"
                  className={`flex items-center w-full hover:bg-slate-50 hover:dark:bg-slate-700/20 py-1 px-3 cursor-pointer`} style={option.id === selected ? {color: '#F09375'} : {}}
                  onClick={() => { setSelected(option.id); setDropdownOpen(false); if(isCustomDate) {
                      setIsCustomDate(false);
                      setDateRange();
                    }}
                  }
                >
                  <svg className={`shrink-0 mr-2 fill-current ${option.id !== selected && 'invisible'}`} width="12" height="9" viewBox="0 0 12 9">
                    <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                  </svg>
                  <span>{option.period}</span>
                </button>
              )
            })
          }
        </div>
      </Transition>
    </div>
  );
}

export default DateSelect;
