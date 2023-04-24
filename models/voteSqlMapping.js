
var user = {
  insert: 'insert into vote(communityId,startTime,endTime,address,draftName,topic,draftDetail,number) VALUES(?,?,?,?,?,?,?,?)',
  accountInsert: 'insert into voteAccounts(draftId,userAddress,userOption) VALUES(?,?,?)',
  queryByCId: 'select * from vote where communityId=?',
  queryByVId: 'select * from vote where draftId=?',
  queryByDId: 'select * from voteAccounts where draftId=?',
  queryAll: 'select * from vote order by communityId asc',
  queryByAddress: 'select * from usercommunity where userAddress=?',
};

module.exports = user;
