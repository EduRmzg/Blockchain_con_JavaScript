const CryptoJS = require("crypto-js");

class Blockchain {
    constructor() {
      this.chain = [this.createGenesisBlock()];
    }
    
    createGenesisBlock() {
      return {
        index: 0,
        timestamp: Date.now(),
        data: "Genesis Block",
        previousHash: "0",
        hash: this.calculateHash(0, Date.now(), "Genesis Block", "0")
      };
    }
    
    createNewBlock(data) {
      const previousBlock = this.getLatestBlock();
      const newBlockIndex = previousBlock.index + 1;
      const newBlockTimestamp = Date.now();
      const newBlock = {
        index: newBlockIndex,
        timestamp: newBlockTimestamp,
        data: data,
        previousHash: previousBlock.hash,
        hash: this.calculateHash(
          newBlockIndex,
          newBlockTimestamp,
          data,
          previousBlock.hash
        )
      };
      this.chain.push(newBlock);
      return newBlock;
    }
    
    getLatestBlock() {
      return this.chain[this.chain.length - 1];
    }
    
    calculateHash(index, timestamp, data, previousHash) {
      return CryptoJS.SHA256(index + timestamp + JSON.stringify(data) + previousHash).toString();
    }
  }
  
  const blockchain = new Blockchain();
  
  blockchain.createNewBlock({ file: "first-file.txt" });
  blockchain.createNewBlock({ file: "second-file.txt" });
  
  console.log(blockchain);
  