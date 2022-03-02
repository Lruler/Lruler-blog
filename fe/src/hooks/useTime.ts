const useTime = () => {
  let s1: Date | string = "2022-02-28"; //设置为你的建站时间
  s1 = new Date(s1.replace(/-/g, "/"));
  let s2 = new Date();
  var days = s2.getTime() - s1.getTime();
  days = Math.floor(days / (1000 * 60 * 60 * 24));
  var number_of_years = Math.floor(days / 365);
  days %= 365;
  var number_of_months = Math.floor(days / 30);
  days %= 30;
  var number_of_days = Math.floor(days);
  var timeHTML = "本站安静的运行了";
  if (number_of_years) timeHTML += number_of_years + "年";
  if (number_of_months) timeHTML += number_of_months + "月";
  if (number_of_days) timeHTML += number_of_days + "天";
  return timeHTML;
};

export default useTime;
