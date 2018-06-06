var Damian = Damian || {}

var GoogleCalendarRepository = function(account) {
  this._googleCalendar = CalendarApp.getCalendarById(account);
  //var calendars = CalendarApp.getCalendarsByName(account);
  //this._googleCalendar = CalendarApp.getCalendarById(calendars[0].getId());

}

GoogleCalendarRepository.prototype.regist = function(monthlyDay,startTime,endTime) {

  this._googleCalendar.createEvent('WORK', new Date(monthlyDay + ' ' + startTime), new Date(monthlyDay + ' ' + endTime), {description:'AUTO APPLY BY DAMIAN@LINE BOT'});
}

GoogleCalendarRepository.prototype.deleteAll = function(startDay,endDay) {

  var events = this._googleCalendar.getEvents(new Date(startDay + ' 00:00:00'), new Date(endDay + ' 23:59:00'));
  for (var i = 0;i < events.length;i++) {
    events[i].deleteEvent();
  }
}

// テストファンクション -> OK
function assertGoogleCalendarDelete() {

  var repo = new GoogleCalendarRepository('xxx@gmail.com');
  var entity = repo.deleteAll('2018/5/1','2018/5/31');
}

// テストファンクション -> OK
function assertGoogleCalendarRegist() {

  var repo = new GoogleCalendarRepository('xxx@gmail.com');
  var entity = repo.regist('2018/5/6','10:45','17:30');
}
