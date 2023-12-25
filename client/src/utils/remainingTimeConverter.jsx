const remainingTimeConverter = (remainderTime) => {
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let remainingHours = Math.floor(remainderTime / oneHour);
  let remainingMinutes = Math.floor((remainderTime % oneHour) / oneMinute);
  let remainingSeconds = Math.floor((remainderTime % oneMinute) / 1000);
  return { remainingHours, remainingMinutes, remainingSeconds };
};
export default remainingTimeConverter;
