/**
 * Calculates difference between two dates
 * @param {string|Date} date1 - First date
 * @param {string|Date} date2 - Second date
 * @returns {{years: number, months: number, days: number, hours: number, minutes: number, seconds: number, totalDays: number}}
 */
export default function dateDifference(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = Math.abs(d2 - d1);
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  let years = d2.getFullYear() - d1.getFullYear();
  let months = d2.getMonth() - d1.getMonth();
  let days = d2.getDate() - d1.getDate();
  if (days < 0) { months--; days += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate(); }
  if (months < 0) { years--; months += 12; }

  return {
    years: Math.abs(years), months: Math.abs(months), days: Math.abs(days),
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor(diff / (1000 * 60)),
    seconds: Math.floor(diff / 1000),
    totalDays
  };
}
