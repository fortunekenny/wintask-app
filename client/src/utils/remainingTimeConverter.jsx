const remainingTimeConverter = (remainderTime, month, year, ampm) => {
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

  let currentTime = new Date();
  let timeNow = new Date().getHours() >= 12 ? "PM" : "AM";
  /*
  let currentHour = timeNow.getHours();
  let currentDate = timeNow.getDate();
  let currentMonth = timeNow.getMonth();
  let currentYear = timeNow.getFullYear();*/

  let timezoneOffset = timeNow.getTimezoneOffset();
  // console.log(timezoneOffset);

  // let remainingHours = Math.floor(remainderTime / oneHour);
  // let remainingMinutes = Math.floor((remainderTime % oneHour) / oneMinute);
  // let remainingSeconds = Math.floor((remainderTime % oneMinute) / 1000);

  // remainderTime =
  //   futureTime < currentTime ? remainderTime + 86400000 : remainderTime;
  // console.log(futureTime);
  // console.log(currentTime);

  let remainingYear = Math.floor(remainderTime / oneYear);
  let remainingMonth = Math.floor((remainderTime % oneYear) / oneMonth);
  let remainingDay = Math.floor((remainderTime % oneMonth) / oneDay);
  let remainingHours = Math.floor((remainderTime % oneDay) / oneHour);

  if (Math.sign(timezoneOffset) === 1) {
    remainingHours = remainingHours - timezoneOffset / 60; //add offset
  }
  if (Math.sign(timezoneOffset) === 1 && ampm === "AM" && timeNow === "PM") {
    remainingHours = remainingHours - timezoneOffset / 60; //add offset
  }
  if (Math.sign(timezoneOffset) === -1) {
    remainingHours = remainingHours + timezoneOffset / 60; // minus offset
  }
  if (Math.sign(timezoneOffset) === -1 && ampm === "AM" && timeNow === "PM") {
    remainingHours = remainingHours + timezoneOffset / 60; // minus offset
  }
  if (Math.sign(timezoneOffset) === 0) {
    return remainingHours;
  }
  remainingHours = remainingHours < 0 ? 0 : remainingHours;
  // console.log(remainingHours);
  // remainingHours =
  //   Math.sign(timezoneOffset) === 1
  //     ? remainingHours - timezoneOffset / 60 //add offset
  //     : remainingHours + timezoneOffset / 60; // minus offset
  // console.log(remainingHours);
  // remainingHours < 0 ? 0 : remainingHours;
  let remainingMinutes = Math.floor((remainderTime % oneHour) / oneMinute);
  let remainingSeconds = Math.floor((remainderTime % oneMinute) / oneSecond);
  return { remainingHours, remainingMinutes, remainingSeconds };
};
export default remainingTimeConverter;
