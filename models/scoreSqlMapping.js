var user = {
    scoreInsert: 'insert into communityScore(userAddress,cid,score,token,property,tokenName) VALUES(?,?,?,?,?,?)',
    scoreUpdate: 'update communityScore set score=? where userAddress=? and cid=? and token=2',
    queryScoreByUid: 'select * from communityScore where userAddress=? and cid=? and token=2',
    queryArticleByAddree:'select * from article where publisher=?',
    queryCidBytoken:'select * from communityScore where userAddress=? and token=1',
    queryScoreByToken:'select * from communityScore where userAddress=? and token=2'
};

module.exports = user;
