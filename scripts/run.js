const main = async () => {
    // hre(Hardhat Runtime Environment)
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });
    await waveContract.deployed();
    console.log("Contract addy:", waveContract.address);
    // console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed to:", waveContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    )

    console.log("Contract balance", hre
    .ethers.utils.formatEther(contractBalance));

      /*
    * Let's try two waves now
    */
    const waveTxn = await waveContract.wave("This is wave #1");
    await waveTxn.wait();

    const waveTxn2 = await waveContract.wave("This is wave #2");
    await waveTxn2.wait();

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    /**
   * Let's send a few waves!
   */
    // let waveTxn = await waveContract.wave("A message");
    // await waveTxn.wait(); //wait for the transaction to be mined

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance", hre.ethers.utils.formatEther(contractBalance));

    // waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
    // await waveTxn.wait(); //wait for the transaction to be mined.

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    // console.log("Contract deployed to:", owner.address);

    // await waveContract.getTotalWaves();

    // const firstWaveTxn = await waveContract.wave();
    // await firstWaveTxn.wait();

    // await waveContract.getTotalWaves();

    // const secondWaveTxn = await waveContract.connect(randomPerson).wave();
    // await secondWaveTxn.wait();

    // await waveContract.getTotalWaves();

};


const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();