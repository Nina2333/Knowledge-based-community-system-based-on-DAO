// models/userSqlMapping.js
// CRUD SQL语句
var user = {
  insert: 'insert into users(name, password, gender, address,birthday,phone,email) VALUES(?,?,?,?,?,?,?)',
  update: 'update users set name=?, sex=?, password=? where uid=?',
  delete: 'delete from users where FIND_IN_SET(uid,?)',
  queryById: 'select * from users where uid=?',
  queryAll: 'select * from users',
  queryByAddress: 'select * from users where address=?',
  queryRoleAddress:'select * from userrole where userAddress=?'
};

module.exports = user;
