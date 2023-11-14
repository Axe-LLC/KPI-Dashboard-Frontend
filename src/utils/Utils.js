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
  HYGIENE_CODES
} from './Consts';

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
  const start = new Date(startDate);
  const end = new Date(endDate);
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
  var start = new Date(startDate);
  const end = new Date(endDate);
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