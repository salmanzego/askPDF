
const pinecone = require("@pinecone-database/pinecone");
const Pinecone = pinecone.Pinecone;

const indexName = "askpdf-index";

const connect = async () => {
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
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


module.exports = connect;