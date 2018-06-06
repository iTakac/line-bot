var Damian = Damian || {}

var ShiftApplyService = function() {
}

ShiftApplyService.prototype.execute = function() {
  var accountInfo = new AccountInfo();
  var team = accountInfo.getTargetArray('team');
  var account = accountInfo.getTargetArray('accounts')
  for (var idx in team) {
    // domain = やりたいこと・関心ごと
    var domain = new MemberShiftDomain(team[idx],account[idx]);

    // 対象となる月のシフト一覧を作成
    var calendar = domain.createShift();

    // 対象となる月のカレンダーを削除
    domain.deleteShift(calendar);

    // 対象となる月のカレンダーを登録
    domain.registShift(calendar);

  }
}

// テストファンクション
function assertShiftApplyService() {
   var service = new ShiftApplyService();
   service.execute();
}
