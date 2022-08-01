const {expect} = require("chai")
const {ethers} = require("hardhat")

describe("Manager", function(){
  // Deploy kisminin aynisi. Test etmek icin once deploy ediyor
  let Manager,manager;
  before(async function(){
    Manager = await hre.ethers.getContractFactory("Manager");
    manager = await Manager.deploy()
    await manager.deployed();
  });

  // Test 1
  it("It should create a new ticket", async function(){
    // Deploy edildikten sonra manageri kullanarak denemeler yapabiliriz.
    await manager.createTicket("Deneme1"); // Contrattaki fonksiyon
    let tickets = await manager.getTickets();
    //console.log(tickets)
    expect(tickets[0].name).to.equal("Deneme1")
  })

  // Test 2
  it("it should update the ticket name", async function(){
    await manager.updateTicketName(0,"Yeni isim");
    let tickets = await manager.getTickets();
    expect(tickets[0].name).to.equal("Yeni isim")
  })


  // Test 3
  it("It should update a ticket status", async function(){
    await manager.updateTicketStatus(0,3);
    let tickets = await manager.getTickets();
    expect(tickets[0].status).to.equal(3);
  })

  // Test 4
  it("it should return a list of tickets", async function(){
    await manager.createTicket("Yeni ticket 1");
    await manager.createTicket("Yeni ticket 2");
    await manager.createTicket("Yeni ticket 3");
    await manager.createTicket("Yeni ticket 4");
    let tickets = await manager.getTickets();
    expect(tickets.length).to.equal(5)
  })


})