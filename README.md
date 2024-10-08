# AskPdf - PDF-Based Chatbot Project

## Project Overview
This project focuses on building a chatbot capable of answering questions based on the content of a provided PDF file. It involves integrating both Node.js and Python backends to handle different tasks effectively.

## Methodology
1. **Extract Text**: Retrieve text content from the uploaded PDF.
2. **Chunk Text**: Divide the extracted text into smaller, manageable chunks.
3. **Generate Embeddings**: Use a sentence similarity model to convert text chunks into multidimensional vectors (embeddings).
4. **Store Embeddings**: Save the embeddings and corresponding text in a vector database.
5. **Query Processing**: When a question is asked:
   - Split the query.
   - Generate embeddings for the query.
6. **Vector Similarity Search**: Perform a similarity search in the vector database using the query embeddings.
7. **Retrieve Responses**: Get responses with similar embeddings and corresponding similarity scores.
8. **Select Text**: Choose the texts with the highest similarity scores.
9. **Create Prompt**: Combine the selected texts to form a prompt.
10. **Generate Response**: Input the prompt into a large language model (LLM).
11. **Return Answer**: Provide the final processed response to the user.

## Technology Stack
- **Frontend**: Next.js
- **Backend**: 
  - **Node.js**: Main application logic, API handling.
  - **Python (Flask)**: Specific tasks like text processing, embedding generation, and interaction with AI models.
- **Database**: Pinecone (vector database)
- **Other Tools**: Huggingface, GORQ, Langchain, Sentence Transformers

## Challenges
- Lack of practical experience with AI models and LLMs.
- Unfamiliarity with some terms from AI areas
- Need to learn AI concepts from scratch.
- Most AI libraries are in Python, while my stack is Node.js.
- Limited Python programming experience.
- Building a Python backend to handle specific tasks and integrating it with the Node.js backend.

## Key Learnings
- Gained understanding of how Retrieval-Augmented Generation (RAG) chatbots work.
- Practical experience with AI model implementation.
- Improved knowledge of tools like Huggingface, Pinecone, and Langchain.

- Learned to bridge the gap between Python and Node.js environments.
- Acquired skills in building and integrating Python backend services for AI-related tasks.

## Screenshots
![Screenshot 2024-09-01 043244](https://github.com/user-attachments/assets/53489a67-ab81-4f46-b741-461df60618d0)
![Screenshot 2024-09-01 043758](https://github.com/user-attachments/assets/1456f891-8c3c-4a5b-8f22-994cac6c8d30)

