var Damian = Damian || {}

var AccountInfoRepository = function() {
  this._spreadSheet = SpreadsheetApp.openByUrl(appInfo.MEMBER_SHEET);
  this._sheet = this._spreadSheet.getSheetByName(appInfo.MEMBER_SHEET_NAME);
}

AccountInfoRepository.prototype.fetch = function() {
    var accountInfoEntity = {team : [],accounts : []};
    const lastRow = this._sheet.getLastRow();
    for (var i = 2;i<lastRow+1;i++) {
      var member_name = this._sheet.getRange(i,1).getValue();
      var account = this._sheet.getRange(i,2).getValue();
      if (account != '') {
        accountInfoEntity.team.push(member_name);
        accountInfoEntity.accounts.push(account);
      }
    }
    return accountInfoEntity;
}

// テストファンクション -> OK
function assertAccountInfoRepository() {

  var repo = new AccountInfoRepository();
  var entity = repo.fetch();
  for (var idx in entity.team) {
    Logger.log('member=' + entity.team[idx] + '/account=' + entity.accounts[idx]);
  }
}
