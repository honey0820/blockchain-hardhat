# Run tests
`npm install`

# contract compile
`npx hardhat compile`

# contract test
`npx hardhat test`

# Deployment and verify (on bsc testnet)
1. Copy .env.example to .env and update needed credentials
2. `npx hardhat run --network bsctestnet scripts/deploy_contracts.js`
3. `npx hardhat verify --network bsctestnet <deployed contract address>`
