var user = {
    insert: 'insert into usercommunity(userAddress,communityID) VALUES(?,?)',
    delete: 'delete from usercommunity where userAddress=? and communityID=?',
    queryByAddress: 'select * from usercommunity where userAddress=?',
};

module.exports = user;
