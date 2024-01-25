import resolveConfig from 'tailwindcss/resolveConfig';
import { STAFF_TYPE_DOCTOR,
  STAFF_TYPE_HYGIENE,
  STAFF_TYPE_TOTAL,
  EMPLOYEE_STATUS_PART_TIME,
  EMPLOYEE_STATUS_FULL_TIME,
  METRICS_PRODUCTION,
  METRICS_ADJUSTMENTS,
  METRICS_COLLECTIONS,
  METRICS_DOCTOR_PRODUCTION,
  METRICS_HYGIENE_PRODUCTION,
  HYGIENE_CODES,
  MONTH_LABELS,
  WEEK_DAYS
} from './Consts';
import axios from 'axios';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js')
}

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);

export const formatThousands = (value) => Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);


export const getFilteredDays = (startDate, endDate) => {
  const start = new Date(startDate?.replace(/-/g, '\/'));
  const end = new Date(endDate?.replace(/-/g, '\/'));
  var days = [];
  while (start <= end) {
    const formattedDate = formatDateString(start);
    days[formattedDate] = {
      [STAFF_TYPE_TOTAL]: 0,
      [STAFF_TYPE_DOCTOR]: 0,
      [STAFF_TYPE_HYGIENE]: 0,
      [EMPLOYEE_STATUS_FULL_TIME]: 0,
      [EMPLOYEE_STATUS_PART_TIME]: 0
    };
    start.setDate(start.getDate() + 1);
  }
  return days;
}

export const generateMetricsData = (data, startDate, endDate, clinic) => {
  var start = new Date(startDate?.replace(/-/g, '\/'));
  const end = new Date(endDate?.replace(/-/g, '\/'));
  var days = [];
  while (start <= end) {
    const formattedDate = formatDateString(start);
    days[formattedDate] = {
      [METRICS_PRODUCTION]: 0,
      [METRICS_ADJUSTMENTS]: 0,
      [METRICS_COLLECTIONS]: 0,
      [METRICS_DOCTOR_PRODUCTION]: 0,
      [METRICS_HYGIENE_PRODUCTION]: 0,
    };
    start.setDate(start.getDate() + 1);
  }
  
  let filteredData = data;
  if(clinic) {
    filteredData = data.filter(d => parseInt(d.clinic.id) === clinic);
  }

  for(let i=0; i<filteredData.length; i++) {
    if(days[filteredData[i].postedOn]) {
      days[filteredData[i].postedOn][METRICS_PRODUCTION] += parseFloat(filteredData[i].calculations?.production);
      days[filteredData[i].postedOn][METRICS_ADJUSTMENTS] += parseFloat(filteredData[i].calculations?.adjustments);
      days[filteredData[i].postedOn][METRICS_COLLECTIONS] += parseFloat(filteredData[i].calculations?.totalPayments);
      if(HYGIENE_CODES.includes(filteredData[i].insuranceCode)) {
        days[filteredData[i].postedOn][METRICS_HYGIENE_PRODUCTION] += parseFloat(filteredData[i].calculations?.production);
      }
      else {
        days[filteredData[i].postedOn][METRICS_DOCTOR_PRODUCTION] += parseFloat(filteredData[i].calculations?.production);
      }
    }
  }

  return days;
}

export const formatDateString = (date) => {
  var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const formatRangeDateString = (date, isStart) => {
  var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return year + '-' + month + '-' + day ;
}

export const dateStringType = (inputDate) => {
  var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        // Months use 0 index.
        return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
    }
}

export const kFormatter = (num) => {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

export const getWorkHoursByProvider = (start, end, openHours, memberData) => {
  let totalHours = 0;
  const dateRanges = divideDateRangeIntoMonths(start, end);

  for (let i=0; i<memberData.length; i++) {
    for (let j=0; j<dateRanges.length; j++) {
      const workHoursData = JSON.parse(memberData[i].work_hours);
      const workHours = workHoursData.find(item => 
        parseInt(item.year) === dateRanges[j].start.getFullYear() && item.month === MONTH_LABELS[dateRanges[j].start.getMonth()]);
      if(workHours) {
        let totalMonthHours = 0;
        let totalMonthEstHours = 0;
        for(let dayOfWeek=0; dayOfWeek<7; dayOfWeek++) {
          const currentDayWorkHours = getDailyWorkHoursPerClinic(memberData[i].clinic, openHours, dayOfWeek);
          totalMonthEstHours += countDaysByWeekday(
            new Date(dateRanges[j].start.getFullYear(), dateRanges[j].start.getMonth(), 1),
            new Date(dateRanges[j].start.getFullYear(), dateRanges[j].start.getMonth()+1, 0),
            dayOfWeek
          ) * currentDayWorkHours;
          totalMonthHours += countDaysByWeekday(new Date(dateRanges[j].start), new Date(dateRanges[j].end), dayOfWeek) * currentDayWorkHours;
        }
        totalHours += parseFloat(workHours.workHours) / totalMonthEstHours * totalMonthHours;
      }
    }
  }

  return totalHours;
}

export const getDailyWorkHoursByProviderRole = (openHours, memberData, today, role) => {
  let totalHours = 0;
  const filteredMemberData = memberData.filter(item => item.role === role);
  for (let i=0; i<filteredMemberData.length; i++) {
    const workHoursData = JSON.parse(filteredMemberData[i].work_hours);
    const workHours = workHoursData.find(item => 
      parseInt(item.year) === today.getFullYear() && item.month === MONTH_LABELS[today.getMonth()]);
    const todayWorkHours = getDailyWorkHoursPerClinic(filteredMemberData[i].clinic, openHours, today.getDay());
    if(workHours) {
      let totalMonthEstHours = 0;
      for(let dayOfWeek=0; dayOfWeek<7; dayOfWeek++) {
        const currentDayWorkHours = getDailyWorkHoursPerClinic(filteredMemberData[i].clinic, openHours, dayOfWeek);
        totalMonthEstHours += countDaysByWeekday(
          new Date(today.getFullYear(), today.getMonth(), 1),
          new Date(today.getFullYear(), today.getMonth()+1, 0),
          dayOfWeek
        ) * currentDayWorkHours;
      }
      totalHours += parseFloat(workHours.workHours) / totalMonthEstHours * todayWorkHours;
    }
  }

  return totalHours;
}

export const getDailyWorkHoursByProviderType = (openHours, memberData, today, type) => {
  let totalHours = 0;
  const filteredMemberData = memberData.filter(item => item.employee_status === type);
  for (let i=0; i<filteredMemberData.length; i++) {
    const workHoursData = JSON.parse(filteredMemberData[i].work_hours);
    const workHours = workHoursData.find(item => 
      parseInt(item.year) === today.getFullYear() && item.month === MONTH_LABELS[today.getMonth()]);
    const todayWorkHours = getDailyWorkHoursPerClinic(filteredMemberData[i].clinic, openHours, today.getDay());

    if(workHours) {
      let totalMonthEstHours = 0;
      for(let dayOfWeek=0; dayOfWeek<7; dayOfWeek++) {
        const currentDayWorkHours = getDailyWorkHoursPerClinic(filteredMemberData[i].clinic, openHours, dayOfWeek);

        totalMonthEstHours += countDaysByWeekday(
          new Date(today.getFullYear(), today.getMonth(), 1),
          new Date(today.getFullYear(), today.getMonth()+1, 0),
          dayOfWeek
        ) * currentDayWorkHours;
      }
      totalHours += parseFloat(workHours.workHours) / totalMonthEstHours * todayWorkHours;
    }
  }

  return totalHours;
}

function getDailyWorkHoursPerClinic(clinic, openHours, day) {
  let todayWorkHours = 0;
  if(clinic === -1) {
     // Filter Open Hour because clinic's id is array's index, there is data for non-existing id index.
    const filteredOpenHours = openHours.filter(item => item ? true : false);
    for(let c=0; c<filteredOpenHours.length; c++) {
      todayWorkHours += filteredOpenHours[c].find(item => item.day === WEEK_DAYS[day]).hours;
    }
    todayWorkHours /= filteredOpenHours.length;
  }
  else {
    todayWorkHours = openHours[clinic].find(item => item.day === WEEK_DAYS[day]).hours;
  }

  return todayWorkHours;
}

function countDaysByWeekday(start, end, weekday) {
  let count = 0;
  let currentDate = start;

  while (currentDate <= end) {
    if (currentDate.getDay() === weekday) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}

function divideDateRangeIntoMonths(startDate, endDate) {
  const dateRanges = [];
  let currentMonthStart = new Date(startDate);

  while (currentMonthStart < new Date(endDate)) {
    const currentMonthEnd = new Date(
      currentMonthStart.getFullYear(),
      currentMonthStart.getMonth() + 1,
      0
    ); // Set to the last day of the month

    const monthEnd = currentMonthEnd < new Date(endDate) ? new Date(currentMonthEnd) : new Date(endDate);

    const monthRange = {
      start: new Date(currentMonthStart),
      end: new Date(monthEnd),
    };

    dateRanges.push(monthRange);

    // Move to the next month
    currentMonthStart = new Date(monthEnd);
    currentMonthStart.setDate(currentMonthStart.getDate() + 1); // Move to the next day
  }

  return dateRanges;
}

export const generateDateFromString = (dateString) => {
  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JavaScript
  const day = parseInt(dateParts[2], 10);

  return new Date(year, month, day);
}