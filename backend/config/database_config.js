// import { Pinecone } from '@pinecone-database/pinecone';
const pinecone = require("@pinecone-database/pinecone");
const Pinecone = pinecone.Pinecone;

const pincone_api_key = "25fc4885-04d6-4650-b18c-f394df513e97";

const pc = new Pinecone({ apiKey: pincone_api_key });

const indexName = "askpdf-index";

const connect = async () => {
  const indexList = await pc.listIndexes();
  
  if (!indexList.indexes.find(index => index.name === indexName)) {
    await pc.createIndex({
      name: indexName,
      dimension: 384,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1'
        }
      }
    });
  } else {
    console.log("index already exists");
  }
}


module.exports = {pc, connect};
// module.exports.connect = connect;