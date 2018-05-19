var monthlyDay = [];
var shiftArray = [];
var startTimeArray = [];
var endTimeArray = [];
var CHANNEL_ACCESS_TOKEN = 'xxx';


// Google Calendar登録
function registShift() {
  var calender = CalendarApp.getCalendarById('xxx@gmail.com');

  // スプレッドシートを読込
  fetchCalendar();

  // 登録ずみのシフトを一括削除
  deleteShift(monthlyDay[0],monthlyDay[monthlyDay.length-1]);

  for (var i = 0;i < monthlyDay.length;i++) {
    if (shiftArray[i] != '') {
      calender.createEvent('WORK AS WIFE', new Date(monthlyDay[i] + ' ' + startTimeArray[i]), new Date(monthlyDay[i] + ' ' + endTimeArray[i]), {description:'AUTO APPLY BY DAMIAN@LINE BOT'});
    }
  }
}

// Google Calendar削除
function deleteShift(startTime,endTime){
  var calendar = CalendarApp.getCalendarById('xxx@gmail.com');
  var events = calendar.getEvents(new Date(startTime + ' 00:00:00'), new Date(endTime + ' 23:59:00'));
  for (var i = 0;i < events.length;i++) {
    events[i].deleteEvent();
       }
}

// calendarシートの読込
function fetchCalendar() {
  var spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/xxx');
  var calendarSheet = spreadsheet.getSheetByName('calendar');
  var month = calendarSheet.getRange("A2").getValue();
  var lastRow = calendarSheet.getLastRow();
  for (var i = 1;i < lastRow;i++) {
    var day = calendarSheet.getRange(i+1,2).getValue();
    var shift = calendarSheet.getRange(i+1,4).getValue();
    var startTime = calendarSheet.getRange(i+1,5).getValue();
    var endTime = calendarSheet.getRange(i+1,6).getValue();
    monthlyDay.push(month.substr(0,4)  + '/' + month.substr(5,6) + '/' + day);
    shiftArray.push(shift);
    startTimeArray.push(startTime);
    endTimeArray.push(endTime);
    Logger.log(monthlyDay[i-1] + ':' + shiftArray[i-1] + ':startTime=' + startTimeArray[i-1] + ':endTime=' + endTimeArray[i-1]);
    //return monthlyDay;
       }
}

// LINEからcallされるエンドポイント

function doPost(e) {
  var reply_token= JSON.parse(e.postData.contents).events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }
  var user_message = JSON.parse(e.postData.contents).events[0].message.text;
  var resp_message;

  if (user_message === 'ダミアン、シフト登録して') {
    registShift();
     resp_message = '登録完了しました！お仕事頑張ってね！';
  } else {
     resp_message = '僕はシフトを自動登録するBot、ダミアンだよ！';
  }

  var url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': resp_message,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
