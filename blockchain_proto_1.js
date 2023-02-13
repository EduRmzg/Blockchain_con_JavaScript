const CryptoJS = require("crypto-js");


class Block {
    constructor(index, timestamp, data, previousHash) {
      this.index = index;
      this.timestamp = timestamp;
      this.data = data;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
    }
  
    calculateHash() {
      return CryptoJS.SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
  }
  
  class Blockchain {
    constructor() {
      this.chain = [this.createGenesisBlock()];
    }
  
    createGenesisBlock() {
      return new Block(0, Date.now(), "Genesis Block", "0");
    }
  
    getLatestBlock() {
      return this.chain[this.chain.length - 1];
    }
  
    addBlock(newBlock) {
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
    }
  
    isChainValid() {
      for (let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];
  
        if (currentBlock.hash !== currentBlock.calculateHash()) {
          return false;
        }
  
        if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
      }
  
      return true;
    }
  }
  
  const fileChain = new Blockchain();
  fileChain.addBlock(new Block(1, Date.now(), { file: "first-file.txt" }));
  fileChain.addBlock(new Block(2, Date.now(), { file: "second-file.txt" }));
  
  console.log(JSON.stringify(fileChain, null, 4));
  console.log("Is blockchain valid? " + fileChain.isChainValid());
  