/**
 * This function will give the time in min value to next 5 mins interval or provided.
 *
 * @param {Number} timeInMins
 * @param {Number} interval
 * @default 5
 *
 * @example
 * roundMins(0) => 0
 * roundMins(1) => 5
 * roundMins(1, 15) => 15
 */
export const roundMins = (timeInMins: number, interval: number = 5) => {
  const hours = Math.floor(timeInMins / 60)
  const remainingMins = timeInMins - hours * 60

  return hours * 60 + Math.ceil(remainingMins / interval) * interval
}
