/**
 * Calculates the exact age from a birth date and the date of the next birthday.
 *
 * @param {string|Date} birthDate - The birth date as an ISO string or Date object.
 * @param {string|Date} [asOfDate] - Optional reference date. Defaults to the current date.
 * @returns {{ years: number, months: number, days: number, nextBirthday: Date }} Object with:
 *   - years: Full years of age.
 *   - months: Additional months beyond the full years.
 *   - days: Additional days beyond the full years and months.
 *   - nextBirthday: Date object of the next birthday.
 * @throws {Error} If the birth date is invalid or in the future.
 *
 * @example
 * calculateAge('1990-06-15');
 * // { years: 35, months: 9, days: 25, nextBirthday: 2026-06-15T00:00:00.000Z }
 */
export default function calculateAge(birthDate, asOfDate) {
  const birth = birthDate instanceof Date ? birthDate : new Date(birthDate);
  const reference = asOfDate !== undefined
    ? (asOfDate instanceof Date ? asOfDate : new Date(asOfDate))
    : new Date();

  // Clear time components for date-only comparison
  const birthDateOnly = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate());
  const referenceDateOnly = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate());

  if (isNaN(birthDateOnly.getTime())) {
    throw new Error('Invalid birth date provided.');
  }
  if (birthDateOnly > referenceDateOnly) {
    throw new Error('Birth date cannot be in the future.');
  }

  // Calculate age
  let years = referenceDateOnly.getFullYear() - birthDateOnly.getFullYear();
  let months = referenceDateOnly.getMonth() - birthDateOnly.getMonth();
  let days = referenceDateOnly.getDate() - birthDateOnly.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(referenceDateOnly.getFullYear(), referenceDateOnly.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate next birthday
  let nextBirthdayYear = referenceDateOnly.getFullYear();
  let nextBirthday = new Date(nextBirthdayYear, birthDateOnly.getMonth(), birthDateOnly.getDate());

  // If the birthday this year has already passed, next birthday is next year
  if (nextBirthday <= referenceDateOnly) {
    nextBirthdayYear++;
    nextBirthday = new Date(nextBirthdayYear, birthDateOnly.getMonth(), birthDateOnly.getDate());
  }

  return { years, months, days, nextBirthday };
}
