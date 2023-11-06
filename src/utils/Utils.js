import resolveConfig from 'tailwindcss/resolveConfig';
import { STAFF_TYPE_DOCTOR, STAFF_TYPE_HYGIENE, STAFF_TYPE_TOTAL, EMPLOYEE_STATUS_PART_TIME, EMPLOYEE_STATUS_FULL_TIME } from './Consts';

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


export const getCurrentMonthDays = () => {
  const today = new Date();
  var date = new Date(today.getFullYear(), today.getMonth(), 1);
  var days = [];
  while (date.getMonth() === today.getMonth() && date.getDate() <= today.getDate()) {
    const formattedDate = formatDateString(date);
    days[formattedDate] = {
      [STAFF_TYPE_TOTAL]: 0,
      [STAFF_TYPE_DOCTOR]: 0,
      [STAFF_TYPE_HYGIENE]: 0,
      [EMPLOYEE_STATUS_FULL_TIME]: 0,
      [EMPLOYEE_STATUS_PART_TIME]: 0
    };
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const formatDateString = (date) => {
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