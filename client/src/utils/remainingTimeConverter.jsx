const remainingTimeConverter = (remainderTime, month, year) => {
  let daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };
  let daysInThisMonth = daysInMonth(month, year);
  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneMonth = daysInThisMonth * oneDay;
  const oneYear = oneDay * 365;

  // let remainingHours = Math.floor(remainderTime / oneHour);
  // let remainingMinutes = Math.floor((remainderTime % oneHour) / oneMinute);
  // let remainingSeconds = Math.floor((remainderTime % oneMinute) / 1000);
  let remainingYear = Math.floor(remainderTime / oneYear);
  let remainingMonth = Math.floor((remainderTime % oneYear) / oneMonth);
  let remainingDay = Math.floor((remainderTime % oneMonth) / oneDay);
  let remainingHours = Math.floor((remainderTime % oneDay) / oneHour);
  let remainingMinutes = Math.floor((remainderTime % oneHour) / oneMinute);
  let remainingSeconds = Math.floor((remainderTime % oneMinute) / oneSecond);
  return { remainingHours, remainingMinutes, remainingSeconds };
};
export default remainingTimeConverter;
