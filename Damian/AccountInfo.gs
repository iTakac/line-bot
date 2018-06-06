var Damian = Damian || {}

var AccountInfo = function() {

  var repository = new AccountInfoRepository();
  var entity = repository.fetch();

  this._team = entity.team;
  this._accounts = entity.accounts;
}

AccountInfo.prototype.getTargetArray = function (target) {

  if (target == 'team') {
    return this._team;
  }

  if (target == 'accounts') {
    return this._accounts;
  }

}

// テストファンクション -> OK
function assertAccountInfoGetTargetArray() {

  var self = new AccountInfo();
  var array = self.getTargetArray('accounts');
  for (var idx in array) {
    Logger.log('team=' + array[idx]);
       }
}
