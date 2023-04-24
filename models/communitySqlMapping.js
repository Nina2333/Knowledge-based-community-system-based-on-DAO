
var user = {
  insert: 'insert into community(topic,c_name,icon, membership,time,account,detail,tokenURI) VALUES(?,?,?,?,?,?,?,?)',
  userInsert: 'insert into usercommunity(userAddress,communityID,comm_name,comm_topic) VALUES(?,?,?,?)',
  articleInsert: 'insert into article(communityId,aName,publisher,publishTime,topic,detail) VALUES(?,?,?,?,?,?)',
  commentInsert:'insert into comment(aid,userAddress,comment,commT) VALUES(?,?,?,?)',
  update: 'update community set topic=?, icon=?, membership=? where communityId=?',
  queryCommunityById:'select * from community where communityId=?',
  queryAllCommunity: 'select * from community',
  queryUserCommunityByAddress: 'select * from usercommunity where userAddress=?',
  queryArticleByCId: 'select * from article where communityId=?',
  queryArticleByAId: 'select * from article where articleId=?',
  queryComments:'select * from comment where aid=?',
  };

module.exports = user;
