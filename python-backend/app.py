import os
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from langchain_huggingface import HuggingFacePipeline
from huggingface_hub import login
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch

from langchain.chains import LLMChain
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain_core.messages import SystemMessage
from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain_groq import ChatGroq

app = Flask(__name__)



@app.route('/embed', methods=['POST'])
def get_embedding():
    model = SentenceTransformer('sentence-transformers/paraphrase-MiniLM-L6-v2')
    try:
        data = request.json
        text_chunks = data

        embeddings = model.encode(text_chunks)
        embeddings_list = embeddings.tolist()
        print(embeddings_list[0])
        return {"embeddings": embeddings_list}
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app.route('/generate', methods=['POST'])
def get_prompt():
    
    try:
        data = request.json
        user_prompt = data['prompt']

        groq_api_key = os.getenv("GROQ_API_KEY")
    
        model = 'llama3-8b-8192'
        groq_chat = ChatGroq(
            groq_api_key=groq_api_key, 
            model_name=model
        )
        system_prompt = 'You are a friendly conversational chatbot, only provide the answer for the questions asked'
        conversational_memory_length = 5

        memory = ConversationBufferWindowMemory(k=conversational_memory_length, memory_key="chat_history", return_messages=True)

        prompt = ChatPromptTemplate.from_messages(
            [
                SystemMessage(
                    content=system_prompt
                ), 

                MessagesPlaceholder(
                    variable_name="chat_history"
                ),

                HumanMessagePromptTemplate.from_template(
                    "{input}"
                ),
            ]
        )

        conversation = LLMChain(
            llm=groq_chat,  
            prompt=prompt,  
            verbose=False,  
            memory=memory, 
        )
        response = conversation.predict(input=user_prompt)

        return {"result": response}
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)