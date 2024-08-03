const crypto = require('crypto');

// Function to calculate the hash
function calculateHash(index, prevHash, timestamp, data) {
    return crypto.createHash('sha256')
                 .update(index + prevHash + timestamp + JSON.stringify(data))
                 .digest('hex');
}

// Genesis block
const genesisBlock = {
    index: 0,
    prevHash: '0',
    timestamp: 1618520800000, // Unix timestamp for January 1, 2021
    data: 'Genesis Block',
    hash: calculateHash(0, '0', 1618520800000, 'Genesis Block')
};

console.log(genesisBlock);

// New block
const newBlock = {
    index: genesisBlock.index + 1,
    prevHash: genesisBlock.hash,
    timestamp: 1618520860000, // Unix timestamp for January 2, 2021
    data: 'New Block',
    hash: calculateHash(genesisBlock.index + 1, genesisBlock.hash, 1618520860000, 'New Block')
};

console.log(newBlock);

// Validate the blockchain
function validateBlockchain(blockchain) {
    for (let i = 1; i < blockchain.length; i++) {
        const currentBlock = blockchain[i];
        const previousBlock = blockchain[i - 1];

        if (currentBlock.hash !== calculateHash(currentBlock.index, previousBlock.hash, currentBlock.timestamp, currentBlock.data)) {
            return false;
        }
    }
    return true;
}

// Validate the initial blockchain
console.log(validateBlockchain([genesisBlock, newBlock])); // Should return true

// Manipulate the blockchain
newBlock.data = 'Manipulated Block';
newBlock.hash = calculateHash(newBlock.index, newBlock.prevHash, newBlock.timestamp, newBlock.data);

console.log(validateBlockchain([genesisBlock, newBlock])); // Should return false

// Add a new block to the blockchain
const newBlock2 = {
    index: newBlock.index + 1,
    prevHash: newBlock.hash,
    timestamp: 1618520920000, // Unix timestamp for January 3, 2021
    data: 'New Block 2',
    hash: calculateHash(newBlock.index + 1, newBlock.hash, 1618520920000, 'New Block 2')
};

// Initialize the blockchain with the genesis block and the first new block
const blockchain = [genesisBlock, newBlock];
blockchain.push(newBlock2);

console.log(`Validation:  ${validateBlockchain(blockchain)}`); // Should return true