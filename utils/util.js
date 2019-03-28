const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const  getDates= todate => {
  var dateArry = [];
  for (var i = 0; i < 3; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry
}
function dateLater(dates, later) {
  var dateObj = {}
  var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六')
  var date = new Date(dates)
  date.setDate(date.getDate() + later)
  var day = date.getDay()
  var yearDate = date.getFullYear()
  var month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1)
  var dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate())
  dateObj.time = yearDate + '-' + month + '-' + dayFormate
  dateObj.week = show_day[day]
  return dateObj
}


module.exports = {
  formatTime: formatTime,
  getDates: getDates,
}
