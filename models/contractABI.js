const Web3 = require("web3");
const create = require('ipfs-http-client');
const ipfs = create({host: 'localhost', port: 5001});
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var account ;
web3.eth.getAccounts(function (error, result) {
    account = result[0];
    console.log(account);
    console.log(isAddress(account));
});

function isAddress(address) {
    return web3.utils.isAddress(address);
}

var abi = [
    {
        "inputs": [],
        "name": "ArticleAlreadyExists",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "CommunityAlreadyExists",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "CommunityNoExists",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UserAlreadyRegistered",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UserNoRegistered",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "articleId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "communityId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "publishTime",
                "type": "uint256"
            }
        ],
        "name": "ArticleCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "communityId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "awarder",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timeStamp",
                "type": "uint256"
            }
        ],
        "name": "CommunityCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "communityId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timeStamp",
                "type": "uint256"
            }
        ],
        "name": "CommunityJoined",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "communityId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "topic",
                "type": "string"
            }
        ],
        "name": "createArticle",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "topic",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
            }
        ],
        "name": "createCommunity",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "communityId",
                "type": "bytes32"
            }
        ],
        "name": "getCommunityToken",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "communityId",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
            }
        ],
        "name": "joinCommunity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "Register",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "userRegister",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "articles",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "articleId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "communityId",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "publisher",
                "type": "address"
            },
            {
                "internalType": "uint64",
                "name": "publishTime",
                "type": "uint64"
            },
            {
                "internalType": "string",
                "name": "topic",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "communities",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "communityId",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "erc20",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "topic",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getArticlesIds",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCommunitiesIds",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isRegister",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = '0xA703e87CBB946ef4015B26f363dE288C66Ea5F28';
const contractInstance = new web3.eth.Contract(abi, contractAddress);

// let number = web3.utils.numberToHex(1);
// console.log({number});
// let number1 = web3.utils.hexToBytes(number);
// console.log({number1});
// console.log({contractInstance:contractInstance.options});

function createCommunities(name,address,tokenURI) {
    console.log("------------- contract create community --------------");
    console.log({name,tokenURI});
    return contractInstance.methods.createCommunity(name,tokenURI).send({ from: address })
        .on("error", function(error) {
            // 告诉用户合约失败了
            console.log(error);
        });
}

function signUser(address) {
    console.log("------------- contract sign user --------------");
    return contractInstance.methods.userRegister().send({from: address}).on('error', function(error) {
        console.log(error);
    });
}

// bytes32 communityId
function joinCommunity(communityId,address,tokenURI) {
    let cid = web3.utils.numberToHex(communityId);
    console.log("------------- contract join community --------------");
    return contractInstance.methods.joinCommunity(cid,tokenURI).send({ from: address})
        .on("error", function(error) {
            console.log(error);
        });
}

// bytes32 communityId
function createArticle(communityId,name) {
    console.log("------------- contract create Article --------------");
    let cid = web3.utils.numberToHex(communityId);
    return contractInstance.methods.createArticle(cid,name).send({ from:account})
        .on("error", function(error) {
            console.log(error);
        });
}

function getCommunityToken(communityId) {
    console.log("------------- contract get community token --------------");
    let cid = web3.utils.numberToHex(communityId);
    return contractInstance.methods.getCommunityToken(cid).send({from:account}).on('error', function(error){
        console.log(error);
    });
}


//创建代币元数据
function createTokenMetadata(tokenName, tokenDescription, tokenImageCID) {
    const tokenMetadata = {
        "name": tokenName,
        "description": tokenDescription,
        "image": `ipfs://${tokenImageCID}`,
    };

    const metadataBuffer = Buffer.from(JSON.stringify(tokenMetadata));
    // const metadataResult = ipfs.add(metadataBuffer);
    var metadataCID;
    ipfs.add(metadataBuffer,async (err,result)=>{
        if(err) throw err;
        metadataCID = result;
        console.log({metadataCID});
    });
    return metadataCID;
}


// getEthBalance(account).then(console.log);

module.exports  = {
    createTokenMetadata: createTokenMetadata,
    createCommunities: createCommunities,
    createArticle:createArticle,
    joinCommunity:joinCommunity,
    getCommunityToken:getCommunityToken,
    isAddress:isAddress,
    signUser:signUser,
};