var Damian = Damian || {}

var MemberShiftDomain = function(member,account) {
  this._member = member;
  this._account = account;
}

MemberShiftDomain.prototype.createShift = function () {

  var form = new CalendarForm();
  var calendar = form.receipt(this._member);
  return calendar;
}

MemberShiftDomain.prototype.registShift = function (calendar) {

  var repo = new GoogleCalendarRepository(this._account);
  var shift = new ShiftInfo();
  for (var idx in calendar.monthlyDay) {
    if (calendar.shiftDiv[idx] != '') {
　 　　　　　　　　　  var startTime = shift.findStartTimeByShift(calendar.shiftDiv[idx]);
  　 　　　　　　　　　var endTime = shift.findEndTimeByShift(calendar.shiftDiv[idx]);
        repo.regist(calendar.monthlyDay[idx],startTime,endTime);
    }
  }
}

MemberShiftDomain.prototype.deleteShift = function (calendar) {
  var repo = new GoogleCalendarRepository(this._account);
  repo.deleteAll(calendar.monthlyDay[0],calendar.monthlyDay[calendar.monthlyDay.length-1]);
}

// テストファンクション -> OK
function assertMemberShiftDomainRegist() {

  var domain = new MemberShiftDomain('店長','xxx@gmail.com');
  var calendar = domain.createShift();
  Logger.log(calendar);
  domain.registShift(calendar);

}

// テストファンクション -> OK
function assertMemberShiftDomainDelete() {

  var domain = new MemberShiftDomain('店長','xxx@gmail.com');
  var calendar = domain.createShift();
  domain.deleteShift(calendar);

}
