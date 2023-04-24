// Setup
// This script demonstrates access to the NFT API via the Alchemy SDK.
const { Network, Alchemy } = require('alchemy-sdk');
// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: "fNjpllXFe-2zcfXeQFVRCcrZ82OsuktZ",
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

// Print owner's wallet address:
const ownerAddr = "0xc53109925e39a9Ca279F9E9c92d36e807CecA417";
console.log("fetching NFTs for address:", ownerAddr);
console.log("...");

// Print total NFT count returned in the response:
const nftsForOwner = alchemy.nft.getNftsForOwner("0xc53109925e39a9Ca279F9E9c92d36e807CecA417");
console.log("number of NFTs found:", nftsForOwner.totalCount);
console.log("...");

// Print contract address and tokenId for each NFT:
for (const nft of nftsForOwner.ownedNfts) {
    console.log("===");
    console.log("contract address:", nft.contract.address);
    console.log("token ID:", nft.tokenId);
}
console.log("===");

// Fetch metadata for a particular NFT:
console.log("fetching metadata for a Crypto Coven NFT...");
const response = alchemy.nft.getNftMetadata(
    "0x5180db8F5c931aaE63c74266b211F580155ecac8",
    "1590"
);

// Uncomment this line to see the full api response:
// console.log(response);

// Print some commonly used fields:
console.log("NFT name: ", response.title);
console.log("token type: ", response.tokenType);
console.log("tokenUri: ", response.tokenUri.gateway);
console.log("image url: ", response.rawMetadata.image);
console.log("time last updated: ", response.timeLastUpdated);
console.log("===");
