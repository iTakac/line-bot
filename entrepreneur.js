var CHANNEL_ACCESS_TOKEN = '{LINEで払い出されたアクセストークン}';


function doPost(e) {
  Logger.log('debug post');
  var reply_token= JSON.parse(e.postData.contents).events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }
  var user_message = JSON.parse(e.postData.contents).events[0].message.text;

  if (user_message === '名言教えて') {
    var resp = UrlFetchApp.fetch("http://meigen.doodlenote.net/api?c=1");
    var xml = XmlService.parse(resp.getContentText());
    var items = xml.getRootElement().getChild('data');
    var meigen = items.getChild('meigen').getText();
    var author = items.getChild('auther').getText();
    user_message = meigen + "by" + author;
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
        'text': user_message,
      }],
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
    Logger.log('debug');
    return ContentService.createTextOutput('ハロー');
}
