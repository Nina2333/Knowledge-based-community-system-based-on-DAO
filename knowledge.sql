/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50735
 Source Host           : localhost:3306
 Source Schema         : knowledge

 Target Server Type    : MySQL
 Target Server Version : 50735
 File Encoding         : 65001

 Date: 25/04/2023 17:21:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `articleId` int(11) NOT NULL AUTO_INCREMENT,
  `communityId` int(11) NOT NULL,
  `aName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `publisher` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `publishTime` date NULL DEFAULT NULL,
  `topic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `detail` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`articleId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, 1, 'python安装教程', '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '2023-04-01', '本章开始，我们将详细介绍Python编程环境的搭建，工欲善其事必先利其器，所以我们这里先介绍python详细安装教程。由于Python是跨平台的，他可以运行在Windows、Linux、Mac等系统上，就算在Windows下写的程序，也可以在Linux上面运行。', 'windows系统安装Python\r\n大部分初学者刚开始应该是windows系统，虽然Linux系统作为开发环境更好，但是我们不能一上来就Linux，等我们熟悉了Python之后再换Linux也不迟。\r\n\r\n在Windows系统安装Python就像我们平时安装软件一样简单，只要下载安装包然后一直下一步就好了。截止到目前（2020-01-30），Python 的最新版本是 3.8.1，我们就以该版本为例演示 Windows 下的 Python 安装过程。\r\n\r\n这里我直接整理了64位和32位的3.8.1版本下载链接给大家：\r\n\r\n64位安装程序链接\r\n32位安装程序链接\r\n但是授人以鱼不如授人以渔，如果以后更新了新的版本，就需要大家自己去寻找了，所以详细的下载方式也一并分享给大家。\r\n\r\n总的下载地址：https://www.python.org/downloads/');
INSERT INTO `article` VALUES (2, 1, 'python安装教程', '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', '2023-04-01', '本章开始，我们将详细介绍Python编程环境的搭建，工欲善其事必先利其器，所以我们这里先介绍python详细安装教程。由于Python是跨平台的，他可以运行在Windows、Linux、Mac等系统上，就算在Windows下写的程序，也可以在Linux上面运行。', 'windows系统安装Python\r\n大部分初学者刚开始应该是windows系统，虽然Linux系统作为开发环境更好，但是我们不能一上来就Linux，等我们熟悉了Python之后再换Linux也不迟。\r\n\r\n在Windows系统安装Python就像我们平时安装软件一样简单，只要下载安装包然后一直下一步就好了。截止到目前（2020-01-30），Python 的最新版本是 3.8.1，我们就以该版本为例演示 Windows 下的 Python 安装过程。\r\n\r\n这里我直接整理了64位和32位的3.8.1版本下载链接给大家：\r\n\r\n64位安装程序链接\r\n32位安装程序链接\r\n但是授人以鱼不如授人以渔，如果以后更新了新的版本，就需要大家自己去寻找了，所以详细的下载方式也一并分享给大家。\r\n\r\n总的下载地址：https://www.python.org/downloads/');
INSERT INTO `article` VALUES (3, 1, 'python安装教程', '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', '2023-04-01', '本章开始，我们将详细介绍Python编程环境的搭建，工欲善其事必先利其器，所以我们这里先介绍python详细安装教程。由于Python是跨平台的，他可以运行在Windows、Linux、Mac等系统上，就算在Windows下写的程序，也可以在Linux上面运行。', 'windows系统安装Python\r\n大部分初学者刚开始应该是windows系统，虽然Linux系统作为开发环境更好，但是我们不能一上来就Linux，等我们熟悉了Python之后再换Linux也不迟。\r\n\r\n在Windows系统安装Python就像我们平时安装软件一样简单，只要下载安装包然后一直下一步就好了。截止到目前（2020-01-30），Python 的最新版本是 3.8.1，我们就以该版本为例演示 Windows 下的 Python 安装过程。\r\n\r\n这里我直接整理了64位和32位的3.8.1版本下载链接给大家：\r\n\r\n64位安装程序链接\r\n32位安装程序链接\r\n但是授人以鱼不如授人以渔，如果以后更新了新的版本，就需要大家自己去寻找了，所以详细的下载方式也一并分享给大家。\r\n\r\n总的下载地址：https://www.python.org/downloads/');
INSERT INTO `article` VALUES (4, 2, 'Node.js 安装配置', '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '2023-04-13', '本章节我们将向大家介绍在 Windows 和 Linux 上安装 Node.js 的方法。  本安装教程以 Node.js v4.4.3 LTS(长期支持版本)版本为例。  Node.js 安装包及源码下载地址为：https://nodejs.org/zh-cn/download/。', '1、Windows 安装包(.msi)\r\n\r\n本文实例以 v0.10.26 版本为例，其他版本类似， 安装步骤：\r\n\r\n步骤 1 : 双击下载后的安装包 v0.10.26，如下所示：\r\n\r\ninstall-node-msi-version-on-windows-step1\r\n\r\n步骤 2 : 点击以上的Run(运行)，将出现如下界面：\r\n\r\ninstall-node-msi-version-on-windows-step2\r\n\r\n步骤 3 : 勾选接受协议选项，点击 next（下一步） 按钮 :\r\n\r\ninstall-node-msi-version-on-windows-step3\r\n\r\n步骤 4 : Node.js默认安装目录为 \"C:\\Program Files\\nodejs\\\" , 你可以修改目录，并点击 next（下一步）：\r\n\r\ninstall-node-msi-version-on-windows-step4\r\n\r\n步骤 5 : 点击树形图标来选择你需要的安装模式 , 然后点击下一步 next（下一步）\r\n\r\ninstall-node-msi-version-on-windows-step5\r\n\r\n步骤 6 :点击 Install（安装） 开始安装Node.js。你也可以点击 Back（返回）来修改先前的配置。 然后并点击 next（下一步）：\r\n\r\ninstall-node-msi-version-on-windows-step6\r\n\r\n安装过程：\r\n\r\ninstall-node-msi-version-on-windows-step7\r\n\r\n点击 Finish（完成）按钮退出安装向导。\r\n\r\ninstall-node-msi-version-on-windows-step8\r\n\r\n检测PATH环境变量是否配置了Node.js，点击开始=》运行=》输入\"cmd\" => 输入命令\"path\"，输出如下结果：\r\n\r\nPATH=C:\\oraclexe\\app\\oracle\\product\\10.2.0\\server\\bin;C:\\Windows\\system32;\r\nC:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;\r\nc:\\python32\\python;C:\\MinGW\\bin;C:\\Program Files\\GTK2-Runtime\\lib;\r\nC:\\Program Files\\MySQL\\MySQL Server 5.5\\bin;C:\\Program Files\\nodejs\\;\r\nC:\\Users\\rg\\AppData\\Roaming\\npm\r\n我们可以看到环境变量中已经包含了C:\\Program Files\\nodejs\\\r\n\r\n检查Node.js版本\r\n\r\nnode-version-test\r\n\r\n2、Windows 二进制文件 (.exe)安装\r\n32 位安装包下载地址 : http://nodejs.org/dist/v0.10.26/node.exe\r\n\r\n64 位安装包下载地址 : http://nodejs.org/dist/v0.10.26/x64/node.exe\r\n\r\n安装步骤\r\n\r\n步骤 1 : 双击下载的安装包 Node.exe ，将出现如下界面 :');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `aid` int(11) NOT NULL,
  `userAddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `commT` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '我觉得这个文章写的很不错，作者可以多创作一些类似的文章', '1681282274217');
INSERT INTO `comment` VALUES (1, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '棒棒棒！！！！我觉得这个文章写的很不错，作者可以多创作一些类似的文章', '1681282550325');
INSERT INTO `comment` VALUES (1, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '棒棒棒！！！！我觉得这个文章写的很不错，作者可以多创作一些类似的文章', '1681282678884');
INSERT INTO `comment` VALUES (1, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '阿三顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶', '1681283353121');
INSERT INTO `comment` VALUES (1, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', 'qwe', '1681283562522');
INSERT INTO `comment` VALUES (2, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '阿斯蒂阿斯蒂阿斯蒂阿斯蒂阿斯蒂阿斯蒂', '1681284018286');
INSERT INTO `comment` VALUES (2, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶', '1681284222644');
INSERT INTO `comment` VALUES (1, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '按时地方烦烦烦烦烦烦烦烦烦烦烦烦烦烦烦', '1681284366355');
INSERT INTO `comment` VALUES (1, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '我觉得这个文章写的很不错，作者可以多创作一些类似的文章', '1681284390197');
INSERT INTO `comment` VALUES (2, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '阿三顶顶顶顶顶顶顶顶到达现场v在CXV吧文本', '1681284484897');

-- ----------------------------
-- Table structure for community
-- ----------------------------
DROP TABLE IF EXISTS `community`;
CREATE TABLE `community`  (
  `communityId` int(11) NOT NULL AUTO_INCREMENT,
  `time` date NOT NULL,
  `c_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `topic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `membership` int(20) NULL DEFAULT NULL,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `detail` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tokenURI` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`communityId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of community
-- ----------------------------
INSERT INTO `community` VALUES (1, '2023-03-28', 'python', 'Python 是一种解释型、面向对象、动态数据类型的高级程序设计语言。  ', 'QmWuoSzcnf4TeZES3GqbGJdz29sFarBz3b55gUMULahcW8', 1, '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', 'Python 是一种解释型、面向对象、动态数据类型的高级程序设计语言。  Python 由 Guido van Rossum 于 1989 年底发明，第一个公开发行版发行于 1991 年。  像 Perl 语言一样, Python 源代码同样遵循 GPL(GNU General Public License) 协议。', '');
INSERT INTO `community` VALUES (2, '2023-03-28', 'node.js', 'Node.js 是一个基于 Chrome JavaScript 运行时建立的一个平台。', 'QmWuoSzcnf4TeZES3GqbGJdz29sFarBz3b55gUMULahcW8', 1, '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', 'Node.js 是一个事件驱动 I/O 服务端 JavaScript 环境，基于 Google 的 V8 引擎，V8 引擎执行 Javascript 的速度非常快，性能非常好。', '');
INSERT INTO `community` VALUES (3, '2023-03-28', 'java', 'Java 是一个通用术语，用于表示 Java 软件及其组件，包括“Java 运行时环境 (JRE)”、“Java 虚拟机 (JVM)”以及“插件”。', 'QmWuoSzcnf4TeZES3GqbGJdz29sFarBz3b55gUMULahcW8', 1, '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', 'Java具有大部分编程语言所共有的一些特征，被特意设计用于互联网的分布式环境。Java具有类似于C++语言的形式和感觉，但它要比C++语言更易于使用，而且在编程时彻底采用了一种以对象为导向的方式。 Java版本指的是 Java 系列和更新编号。示例：在网站上或者 Windows 程序中，版本显示为 Java 8 Update 25。旧版本也可显示为 1.7.0_65，这表示 Java 7 Update 65。', '');
INSERT INTO `community` VALUES (4, '2023-04-09', 'solidity', 'Solidity 是一门面向合约的、为实现智能合约而创建的高级编程语言。智能合约是管理以太坊状态里账户行为的程序。', 'QmRQqEYba3hw9c7wHdAe4dujwJ2wFqUq3nUfvtkaakvC2C', 1, '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', 'Solidity是一种针对Ethereum虚拟机（EVM）设计的 花括号语言 。 它受到了C++、Python和JavaScript的影响。你可以在 语言影响 部分找到更多关于Solidity受到哪些语言启发的细节。  Solidity 是静态类型语言，支持继承、库和复杂的用户定义类型等特性。  在部署合约时，应该尽量使用最新版本，因为新版本会有一些重大的新特性以及bug修复（除特殊情况）。', '');
INSERT INTO `community` VALUES (6, '2023-04-18', 'mysql', 'MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。', 'QmWuoSzcnf4TeZES3GqbGJdz29sFarBz3b55gUMULahcW8', 1, '0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', '数据库（Database）是按照数据结构来组织、存储和管理数据的仓库。\r\n\r\n每个数据库都有一个或多个不同的 API 用于创建，访问，管理，搜索和复制所保存的数据。\r\n\r\n我们也可以将数据存储在文件中，但是在文件中读写数据速度相对较慢。\r\n\r\n所以，现在我们使用关系型数据库管理系统（RDBMS）来存储和管理大数据量。所谓的关系型数据库，是建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据。\r\n\r\nRDBMS 即关系数据库管理系统(Relational Database Management System)的特点：\r\n\r\n1.数据以表格的形式出现\r\n2.每行为各种记录名称\r\n3.每列为记录名称所对应的数据域\r\n4.许多的行和列组成一张表单\r\n5.若干的表单组成database', 'QmUHyFYHVZohjgcX8eXUM2P5ewyCQJ5AAF9WC3WyqcNf8j');
INSERT INTO `community` VALUES (7, '2023-04-18', 'go', 'Go 是一个开源的编程语言，它能让构造简单、可靠且高效的软件变得容易。', 'QmeHTye74uCaQCeJZB3JkbDoQTAMWySjmtaWgXJ5Hwx8Ku', 1, '0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', 'Go是从2007年末由Robert Griesemer, Rob Pike, Ken Thompson主持开发，后来还加入了Ian Lance Taylor, Russ Cox等人，并最终于2009年11月开源，在2012年早些时候发布了Go 1稳定版本。现在Go的开发已经是完全开放的，并且拥有一个活跃的社区。\r\nGo 语言被设计成一门应用于搭载 Web 服务器，存储集群或类似用途的巨型中央服务器的系统编程语言。\r\n\r\n对于高性能分布式系统领域而言，Go 语言无疑比大多数其它语言有着更高的开发效率。它提供了海量并行的支持，这对于游戏服务端的开发而言是再好不过了。', 'QmNqfznasPCgcT3qFcXpNrQKcurweyUYAQHC57hss3bTPk');

-- ----------------------------
-- Table structure for communityscore
-- ----------------------------
DROP TABLE IF EXISTS `communityscore`;
CREATE TABLE `communityscore`  (
  `userAddress` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cid` int(10) NOT NULL,
  `token` int(10) NOT NULL,
  `score` int(50) NOT NULL,
  `property` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tokenName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of communityscore
-- ----------------------------
INSERT INTO `communityscore` VALUES ('0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', 1, 1, 1, 'ERC721', 'python');
INSERT INTO `communityscore` VALUES ('0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', 1, 2, 15, 'ERC20', 'python');
INSERT INTO `communityscore` VALUES ('0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', 2, 2, 10, 'ERC20', 'node.js');
INSERT INTO `communityscore` VALUES ('0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', 5, 1, 1, 'ERC721', 'mysql');
INSERT INTO `communityscore` VALUES ('0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', 7, 1, 1, 'ERC721', 'go');
INSERT INTO `communityscore` VALUES ('0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', 1, 1, 1, 'ERC721', 'python');
INSERT INTO `communityscore` VALUES ('0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', 4, 1, 1, 'ERC721', 'solidity');
INSERT INTO `communityscore` VALUES ('0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', 2, 1, 1, 'ERC721', 'node.js');
INSERT INTO `communityscore` VALUES ('0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', 3, 1, 1, 'ERC721', 'java');

-- ----------------------------
-- Table structure for usercommunity
-- ----------------------------
DROP TABLE IF EXISTS `usercommunity`;
CREATE TABLE `usercommunity`  (
  `userAddress` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `communityID` int(10) NOT NULL,
  `comm_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `comm_topic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usercommunity
-- ----------------------------
INSERT INTO `usercommunity` VALUES ('0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', 2, 'node.js', 'Node.js 是一个基于 Chrome JavaScript 运行时建立的一个平台。');
INSERT INTO `usercommunity` VALUES ('0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', 3, 'java', 'Java 是一个通用术语，用于表示 Java 软件及其组件，包括“Java 运行时环境 (JRE)”、“Java 虚拟机 (JVM)”以及“插件”。');
INSERT INTO `usercommunity` VALUES ('0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', 1, 'python', 'Python 是一种解释型、面向对象、动态数据类型的高级程序设计语言。  ');
INSERT INTO `usercommunity` VALUES ('0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', 4, 'solidity', 'Solidity 是一门面向合约的、为实现智能合约而创建的高级编程语言。智能合约是管理以太坊状态里账户行为的程序。');
INSERT INTO `usercommunity` VALUES ('0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', 1, 'python', 'Python 是一种解释型、面向对象、动态数据类型的高级程序设计语言。  ');
INSERT INTO `usercommunity` VALUES ('0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', 2, 'node.js', 'Node.js 是一个基于 Chrome JavaScript 运行时建立的一个平台。');
INSERT INTO `usercommunity` VALUES ('0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', 5, 'mysql', 'MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。');
INSERT INTO `usercommunity` VALUES ('0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', 7, 'go', 'Go 是一个开源的编程语言，它能让构造简单、可靠且高效的软件变得容易。');

-- ----------------------------
-- Table structure for userrole
-- ----------------------------
DROP TABLE IF EXISTS `userrole`;
CREATE TABLE `userrole`  (
  `cid` int(10) NOT NULL,
  `userAddress` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `c_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userrole
-- ----------------------------
INSERT INTO `userrole` VALUES (1, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', 'python');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `uid` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birthday` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'zlx', '123456', '女', '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', '2023-03-14', '123', NULL);
INSERT INTO `users` VALUES (2, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '123456', '女', '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', '2023-04-10', '13320088477', NULL);
INSERT INTO `users` VALUES (3, '0x1946A2C38d435a6E87C8B0d7406e1471767646cd', '123456', '女', '0x1946A2C38d435a6E87C8B0d7406e1471767646cd', '2023-04-10', '123', NULL);
INSERT INTO `users` VALUES (4, '0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', '123456', '男', '0x4a8583bDF1Bb689ddD50A99d5f1B3EE9D88C52B6', '2023-04-17', '13970935962', NULL);

-- ----------------------------
-- Table structure for userscore
-- ----------------------------
DROP TABLE IF EXISTS `userscore`;
CREATE TABLE `userscore`  (
  `uid` int(11) NOT NULL,
  `score` int(50) NULL DEFAULT NULL,
  `contractAddress` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userscore
-- ----------------------------

-- ----------------------------
-- Table structure for vote
-- ----------------------------
DROP TABLE IF EXISTS `vote`;
CREATE TABLE `vote`  (
  `draftId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `communityId` int(11) NOT NULL,
  `startTime` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `endTime` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `draftName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `topic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `draftDetail` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`draftId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of vote
-- ----------------------------
INSERT INTO `vote` VALUES (1, 2, '1680514020000', '1680514200000', '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', '组织一次社区的线下见面会', '1', '2', 2);
INSERT INTO `vote` VALUES (2, 3, '1681093200000', '1681179600000', '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', '组织一次社区的线下见面会', '我们想组织一下java的线下交流会，现在征求大家的意见', '主题选择\r\n选择一个适合你的目标受众和业务的主题。主题应该与你的业务和目标受众相关，并能够吸引他们的兴趣。例如，如果你的业务是健身行业，你可以选择一个关于健身的主题。\r\n\r\n地点选择\r\n选择一个适合你的目标受众和主题的场地。你可以选择一个适合举办活动的会议室、酒店、咖啡厅等场所。\r\n\r\n时间安排\r\n选择一个适合你的目标受众和主题的时间。你可以选择在周末或晚上举行，以确保更多的人能够参加。\r\n\r\n议程安排\r\n安排一个吸引人的议程，包括演讲、讨论和互动环节。你可以邀请业内专家和你的目标受众来发表演讲和分享经验。在互动环节中，你可以组织小组讨论或游戏活动，以增强互动和参与感。\r\n\r\n宣传推广\r\n在社交媒体、电子邮件、短信、传单等渠道上宣传你的活动。你可以通过与你的目标受众联系，邀请他们来参加你的活动。你还可以邀请他们分享你的活动信息，以吸引更多的人来参加。\r\n\r\n预算和费用\r\n制定一个详细的预算，并考虑各项费用，例如场地租赁、设备租赁、食品和饮料、宣传材料、礼品和奖品等。你可以考虑赞助商或合作伙伴来减轻一部分费用负担。\r\n\r\n活动执行\r\n在活动当天，你需要确保一切准备就绪。你可以在会场设置注册台、签到台和信息展示台，以方便参会者的管理和信息获取。你还需要为参会者提供充足的食品和饮料，并确保他们的安全和舒适。\r\n', 5);

-- ----------------------------
-- Table structure for voteaccounts
-- ----------------------------
DROP TABLE IF EXISTS `voteaccounts`;
CREATE TABLE `voteaccounts`  (
  `draftId` int(11) NOT NULL,
  `userAddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `userOption` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of voteaccounts
-- ----------------------------
INSERT INTO `voteaccounts` VALUES (1, 'qweqweqweqe', 'agree');
INSERT INTO `voteaccounts` VALUES (1, '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', 'agree');
INSERT INTO `voteaccounts` VALUES (1, '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', 'agree');
INSERT INTO `voteaccounts` VALUES (2, '0x9Dcf17A9E5fa89E27bf6bB4Fd3843230DF450D99', 'agree');
INSERT INTO `voteaccounts` VALUES (2, '0xCd726FeCCB75659564C73aF374405cFa8dc90CAD', 'disagree');

SET FOREIGN_KEY_CHECKS = 1;
