var Damian = Damian || {}

var ShiftInfoRepository = function() {
  this._spreadSheet = SpreadsheetApp.openByUrl(appInfo.SHIFT_SHEET);
  this._sheet = this._spreadSheet.getSheetByName(appInfo.SHIFT_SHEET_NAME);
}

ShiftInfoRepository.prototype.fetch = function() {
    var shiftInfoEntity = {shiftDiv : [],startTime :[],endTime : []};
    const lastRow = this._sheet.getLastRow();
    for (var i = 3;i<lastRow+1;i++) {
      var shift_div = this._sheet.getRange(i,1).getValue();
      var start_time = this._sheet.getRange(i,2).getValue();
      var end_time = this._sheet.getRange(i,3).getValue();
      shiftInfoEntity.shiftDiv.push(shift_div);
      shiftInfoEntity.startTime.push(start_time);
      shiftInfoEntity.endTime.push(end_time);
    }
    return shiftInfoEntity;
}

ShiftInfoRepository.prototype.findTimeByShiftDiv = function (shiftDiv,target) {

  var lastRow = this._sheet.getLastRow();
  for (var i = 3;i < lastRow+1 ;i++){
    var shift_div = this._sheet.getRange(i,1).getValue();
    if (shiftDiv == shift_div) {
      return this._sheet.getRange(i,target).getValue();
    }

  }
}

// テストファンクション -> OK
function assertShiftInfoRepository() {

  var repo = new ShiftInfoRepository();
  var entity = repo.fetch();
  for (var idx in entity.shiftDiv) {
    Logger.log('shiftDiv=' + entity.shiftDiv[idx] + '/startTime=' + entity.startTime[idx] + '/endTime=' + entity.endTime[idx]);
  }

  var shiftDiv = ['B','D','M'];
  for (var idx in shiftDiv) {
    Logger.log('startTime=' + repo.findTimeByShiftDiv(shiftDiv[idx],2));
    Logger.log('endTime=' + repo.findTimeByShiftDiv(shiftDiv[idx],3));
  }

}
