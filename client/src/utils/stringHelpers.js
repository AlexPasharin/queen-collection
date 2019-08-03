export const decode = str => str.replace(/_/g, " ")
export const encode = str => str.replace(/\s/g, "_")

const daysInMonthes = Object.freeze([0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])

const leapYear = year =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

const twoDigitStrToInt = str => Number(str[0] === '0' ? str[1] : str)


export const validateDate = dateStr => {
  if (!dateStr)
    return { valid: true }

  const [year, month, day] = dateStr.split("-");

  if (!/^((19)|(20))\d\d$/.test(year)) {
    return { valid: false, reason: `year is ${year}` }
  }

  if (month === undefined)
    return { valid: true }

  if (!/^([1-9]|(0[1-9])|(1[1-2]))$/.test(month)) {
    return { valid: false, reason: `month is ${month}` }
  }

  if (day === undefined) {
    return { valid: true }
  }

  if (!/^\d{1,2}$/.test(day)) {
    return { valid: false, reason: `day is ${day}` }
  }

  const monthAsInt = twoDigitStrToInt(month)
  const dayAsInt = twoDigitStrToInt(day)
  let daysInMonth = daysInMonthes[monthAsInt]

  if (monthAsInt === 2 && leapYear(Number(year))) {
    daysInMonth += 1
  }

  if (dayAsInt < 1 || dayAsInt > daysInMonth) {
    return { valid: false, reason: `month is ${month}, days in month ${daysInMonth}, day is ${day}` }
  }

  return { valid: true }
}
