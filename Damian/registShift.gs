var CHANNEL_ACCESS_TOKEN = 'xxx';


// LINEからcallされるエンドポイント

function doPost(e) {
  var reply_token= JSON.parse(e.postData.contents).events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }
  var user_message = JSON.parse(e.postData.contents).events[0].message.text;
  var resp_message;

  if (user_message === 'ダミアン、シフト登録して') {
     var service = new ShiftApplyService();
     service.execute();
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
