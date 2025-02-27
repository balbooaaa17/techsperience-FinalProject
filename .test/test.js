const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const app = require('../index'); // Assuming your main file is index.js

describe('Kontratat API Tests', function() {
  let mongoServer;
  let db;
  let kontratatekomunes;
  let originalConnect;
  
  // This runs before all tests
  before(async function() {
    this.timeout(10000); // Increase timeout for MongoDB memory server startup
    
    // Start an in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    // Connect to the in-memory database
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db('kontratat');
    kontratatekomunes = db.collection('kontratatekomunes');
    
    // Insert sample data
    await kontratatekomunes.insertMany([
      {
        title: 'Test Contract 1',
        description: 'This is a test contract',
        aktiviteti: 'Test Activity',
        dataInicimit: '2023-01-01',
        publikimiShpalljes: '2023-01-05',
        dataNenshkrimit: '2023-01-10',
        afatetPerImplementim: '30 days',
        afatetPerImplementim1: '60 days',
        dataPermbylljes: '2023-03-01',
        cmimiKontrates: '10000',
        cmimiTotalipaguar: '9500',
        emriiKontratDhenesit: 'Test Company'
      },
      {
        title: 'Test Contract 2',
        description: 'This is another test contract',
        aktiviteti: 'Another Test Activity',
        dataInicimit: '2023-02-01',
        publikimiShpalljes: '2023-02-05',
        dataNenshkrimit: '2023-02-10',
        afatetPerImplementim: '45 days',
        afatetPerImplementim1: '90 days',
        dataPermbylljes: '2023-04-15',
        cmimiKontrates: '20000',
        cmimiTotalipaguar: '19000',
        emriiKontratDhenesit: 'Another Test Company'
      }
    ]);
    
    // Replace the global MongoDB connection with our in-memory one
    global.kontratatekomunes = kontratatekomunes;
    
    // Stub the MongoClient.connect method to prevent real DB connections
    originalConnect = MongoClient.connect;
    sinon.stub(MongoClient, 'connect').callsFake((uri, callback) => {
      if (callback) {
        callback(null, { collection: () => kontratatekomunes });
      }
      return Promise.resolve({ db: () => ({ collection: () => kontratatekomunes }) });
    });
  });
  
  // This runs after all tests
  after(async function() {
    // Restore original MongoClient.connect
    if (originalConnect) {
      MongoClient.connect.restore();
    }
    
    // Stop the in-memory MongoDB instance
    if (mongoServer) {
      await mongoServer.stop();
    }
  });
  
  // Test the root route
  describe('GET /', function() {
    it('should respond with status 200', function(done) {
      request(app)
        .get('/')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
  
  // Test the contracts listing route
  describe('GET /kontrat/kontra', function() {
    it('should retrieve all contracts', function(done) {
      request(app)
        .get('/kontrat/kontra')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          // Since we're rendering a view, we can't easily check the response body
          // In a real test, you might check for specific HTML elements
          done();
        });
    });
  });
  
  // Test contract creation
  describe('POST /kontrat/add', function() {
    it('should create a new contract', function(done) {
      const newContract = {
        title: 'New Test Contract',
        description: 'This is a new test contract',
        aktiviteti: 'New Test Activity',
        dataInicimit: '2023-05-01',
        publikimiShpalljes: '2023-05-05',
        dataNenshkrimit: '2023-05-10',
        afatetPerImplementim: '30 days',
        afatetPerImplementim1: '60 days',
        dataPermbylljes: '2023-07-01',
        cmimiKontrates: '15000',
        cmimiTotalipaguar: '14000',
        emriiKontratDhenesit: 'New Test Company'
      };
      
      request(app)
        .post('/kontrat/add')
        .send(newContract)
        .expect(302) // Expecting a redirect
        .end(async function(err, res) {
          if (err) return done(err);
          
          // Verify the contract was added to the database
          const addedContract = await kontratatekomunes.findOne({ title: 'New Test Contract' });
          expect(addedContract).to.exist;
          expect(addedContract.description).to.equal('This is a new test contract');
          done();
        });
    });
  });
  
  // Test retrieving a single contract
  describe('GET /kontrat/:id', function() {
    it('should retrieve a single contract', async function() {
      // First, get a contract ID
      const contract = await kontratatekomunes.findOne({ title: 'Test Contract 1' });
      
      return request(app)
        .get(`/kontrat/${contract._id}`)
        .expect(200);
    });
  });
  
  // Test the edit contract form route
  describe('GET /kontrat/edit/:id', function() {
    it('should retrieve the edit form for a contract', async function() {
      // First, get a contract ID
      const contract = await kontratatekomunes.findOne({ title: 'Test Contract 1' });
      
      return request(app)
        .get(`/kontrat/edit/${contract._id}`)
        .expect(200);
    });
  });
  
  // Test updating a contract
  describe('POST /kontrat/update/:id', function() {
    it('should update an existing contract', async function() {
      // First, get a contract ID
      const contract = await kontratatekomunes.findOne({ title: 'Test Contract 1' });
      
      const updatedData = {
        title: 'Updated Test Contract',
        description: 'This contract has been updated',
        aktiviteti: contract.aktiviteti,
        dataInicimit: contract.dataInicimit,
        publikimiShpalljes: contract.publikimiShpalljes,
        dataNenshkrimit: contract.dataNenshkrimit,
        afatetPerImplementim: contract.afatetPerImplementim,
        afatetPerImplementim1: contract.afatetPerImplementim1,
        dataPermbylljes: contract.dataPermbylljes,
        cmimiKontrates: contract.cmimiKontrates,
        cmimiTotalipaguar: contract.cmimiTotalipaguar,
        emriiKontratDhenesit: contract.emriiKontratDhenesit
      };
      
      await request(app)
        .post(`/kontrat/update/${contract._id}`)
        .send(updatedData)
        .expect(302); // Expecting a redirect
      
      // Verify the contract was updated in the database
      const updatedContract = await kontratatekomunes.findOne({ _id: contract._id });
      expect(updatedContract.title).to.equal('Updated Test Contract');
      expect(updatedContract.description).to.equal('This contract has been updated');
    });
  });
  
  // Test deleting a contract
  describe('GET /kontrat/delete/:id', function() {
    it('should delete a contract', async function() {
      // First, get a contract ID
      const contract = await kontratatekomunes.findOne({ title: 'Test Contract 2' });
      
      await request(app)
        .get(`/kontrat/delete/${contract._id}`)
        .expect(302); // Expecting a redirect
      
      // Verify the contract was deleted from the database
      const deletedContract = await kontratatekomunes.findOne({ _id: contract._id });
      expect(deletedContract).to.be.null;
    });
  });
});
