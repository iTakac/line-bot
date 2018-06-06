var Damian = Damian || {}

var CalendarForm = function() {
  this._spreadSheet = SpreadsheetApp.openByUrl(appInfo.CALENDAR_SHEET);
  this._sheet = this._spreadSheet.getSheetByName(appInfo.CALENDAR_SHEET_NAME);
}

CalendarForm.prototype.receipt = function(member) {
    var self = this;
    var calendarEntity = {monthlyDay : [],shiftDiv : []};
    const month = this._sheet.getRange("A2").getValue();
    const lastCol = this._sheet.getLastColumn();
    var memberRow = decideMemberRow(member,self);
    for (var i = 3;i<lastCol+1;i++) {
      var day = this._sheet.getRange(5,i).getValue();
      var shiftDiv = this._sheet.getRange(memberRow,i).getValue();
      calendarEntity.monthlyDay.push(month.substr(0,4)  + '/' + month.substr(5,6) + '/' + day);
      calendarEntity.shiftDiv.push(shiftDiv);
    }
    return calendarEntity;
}

var decideMemberRow = function(member,self){

  var lastRow = self._sheet.getLastRow();
  for (var i =7;i < lastRow; i++) {
    var cursorMember = self._sheet.getRange(i,1).getValue();
    if (member === cursorMember) {
      return i;
    }
  }
}

// テストファンクション　-> NG
function assertCalendarForm() {
  var form = new CalendarForm();
  var array = [];
  var calendar = form.receipt('岩崎');
  for (var idx in calendar.monthlyDay) {
    Logger.log('monthlyDay = ' + calendar.monthlyDay[idx] + '/shiftDiv = ' + calendar.shiftDiv[idx]);
  }

}
