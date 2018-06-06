var Damian = Damian || {}

var ShiftInfo = function() {

  var repository = new ShiftInfoRepository();
  var entity = repository.fetch();

  this._shiftDiv = entity.shiftDiv;
  this._startTime = entity.startTime;
  this._endTime = entity.endTime;

}

ShiftInfo.prototype.getTargetArray = function (target) {

  if (target == 'shift') {
    return this._shiftDiv;
  }

  if (target == 'startTime') {
    return this._startTime;
  }

  if (target == 'endTime') {
    return this._endTime;
  }
}

ShiftInfo.prototype.findStartTimeByShift = function (shiftDiv) {

  var self = this._shiftDiv;
  for (var idx in self) {
    if (shiftDiv == self[idx]) {
      return this._startTime[idx];
    }
  }
}

ShiftInfo.prototype.findEndTimeByShift = function (shiftDiv) {

  var self = this._shiftDiv;
  for (var idx in self) {
    if (shiftDiv == self[idx]) {
      return this._endTime[idx];
    }
  }
}

// テストファンクション -> OK
function assertGetTargetArray() {

  var self = new ShiftInfo();
  var array = self.getTargetArray('endTime');
  for (var idx in array) {
    Logger.log('shift=' + array[idx]);
       }
}

// テストファンクション
function assertfindTime() {

  var self = new ShiftInfo();
  var time = self.findEndTimeByShift('M');
  Logger.log(time);

}
