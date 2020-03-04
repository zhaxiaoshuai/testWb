export const dateFormatYmd = (date) => {
  if (!date) {
    return '';
  }
  let myDate = new Date(date);
  const map = {
    year: myDate.getFullYear(),
    month: myDate.getMonth() + 1, // 月份
    day: myDate.getDate() // 日
  };

  return map.year + '/' + map.month + '/' + map.day;
}
