import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { formatRangeDateString } from '../utils/Utils';

function Datepicker({
  align,
  setStartDate,
  setEndDate,
  start,
  end,
  setIsCustomDate
}) {
  const [isRendering, setRendering] = useState(false);
  useEffect(() => {
    setRendering(true);
    setTimeout(() => setRendering(false), 100);
  }, [start, end]);

  const options = {
    mode: 'range',
    static: true,
    monthSelectorType: 'static',
    dateFormat: 'M j, Y',
    defaultDate: [new Date(start), new Date(end)],
    prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
    nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    onReady: (selectedDates, dateStr, instance) => {
      const customClass = (align) ? align : '';
      instance.calendarContainer.classList.add(`flatpickr-${customClass}`);
    },
    onChange: (selectedDates, dateStr, instance) => {
      if(selectedDates[1]) {
        setEndDate(formatRangeDateString(selectedDates[1], false));
        setStartDate(formatRangeDateString(selectedDates[0], true));
        setIsCustomDate(true);
      }
    },
  }

  return (
    <div className="relative">
      <div className='w-64'>{start && end && !isRendering && <Flatpickr className="form-input pl-9 dark:bg-slate-800 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 font-medium shadow-none w-64" options={options} />}
      </div>
      <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
        <svg className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 ml-3" viewBox="0 0 16 16">
          <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
        </svg>
      </div>
    </div>
  );
}

export default Datepicker;
