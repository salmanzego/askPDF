const fs = require('fs');
const pdfParse = require('pdf-parse');
const textSplitters = require("@langchain/textsplitters");
const { response } = require('../app');
const RecursiveCharacterTextSplitter = textSplitters.RecursiveCharacterTextSplitter;
const TransformersApi = Function('return import("@xenova/transformers")')();
const pinecone = require("../config/database_config");
const pc = pinecone.pc;
const langchain_prompts = require("@langchain/core/prompts");
const PromptTemplate = langchain_prompts.PromptTemplate;
const hfinference = require("@huggingface/inference");
const HfInference = hfinference.HfInference;
module.exports = {
  extractPdf: (pdf) => {
    return new Promise(async (resolve, reject) => {
      const dataBuffer = fs.readFileSync(pdf);
      const pdfData = await pdfParse(dataBuffer);
      if (pdfData) {
        resolve(pdfData.text);
      }
    })
  },
  textSplit: (docs) => {
    return new Promise(async (resolve, reject) => {
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 300,
      });
      const splits = await textSplitter.splitText(docs);
      if (splits) {
        resolve(splits);
      }
    })
  },
  getEmbed: (chunks) => {
    return new Promise(async (resolve, reject) => {
      const endpoint = "http://localhost:5000/embed";

      const response = await fetch(endpoint,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(chunks),
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve(data);
      }
    })
  },
  embedSplits: (splits) => {
    return new Promise(async (resolve, reject) => {
      const embeddings = await module.exports.getEmbed(splits);
      resolve(embeddings);
    })
  },
  storeData: (data, chunks, name) => {
    return new Promise(async (resolve, reject) => {
      const index = pc.index("askpdf-index");
      const vectors = data.map((embedding, ind) => ({
        id: `doc_chunk${ind}`,
        values: embedding,
        metadata: { text: chunks[ind] },
      }));
      try {
        await index.namespace(name).upsert(vectors);
        resolve({ msg: "data upserted" });
      } catch (error) {
        console.log(error);
        reject({ error: error });
      }
    })
  },
  queryData: (query, name) => {
    return new Promise(async (resolve, reject) => {
      const index = pc.index("askpdf-index");
      try {
        const queryResponse = await index.namespace(name).query({
          vector: query,
          topK: 3,
          includeValues: true,
          includeMetadata: true,
        });
        if (queryResponse) {
          resolve(queryResponse);
        } else {
          throw new Error("Error getting response");
        }
      } catch (error) {
        reject(error);
      }
    })
  },
  generatePrompt: (matches, query) => {
    return new Promise(async (resolve, reject) => {
      const texts = matches.map(obj => {
        return obj.metadata.text;
      });
      try {
        const prompt = PromptTemplate.fromTemplate(
          `Based on the following information:
            1. {txt_chunk_1}
            2. {txt_chunk_2}
            3. {txt_chunk_3}
  
          Please answer the question: {question}`
        );
        const final_prompt = await prompt.format({
          txt_chunk_1: texts[0],
          txt_chunk_2: texts[1],
          txt_chunk_3: texts[2],
          question: query
        })
        resolve(final_prompt);
      } catch (error) {
        reject(error)
      }
    })
  },
  getResult: (prompt) => {
    return new Promise(async (resolve, reject) => {
      const endpoint = "http://localhost:5000/generate";
      
      try {
        const response = await fetch(endpoint,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({prompt: prompt}) ,
          }
        );

        if (response.ok) {
          const result = await response.json();
          resolve(result);
        } else {
          throw new Error("Some error in inference api");
        }
      } catch (error) {
        reject(error);
      }
    })
  }
}