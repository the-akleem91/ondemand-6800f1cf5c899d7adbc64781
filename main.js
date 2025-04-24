
const axios = require('axios');

const API_KEY = '<replace_api_key>';
const EXTERNAL_USER_ID = '<replace_external_user_id>';
const QUERY = 'Put your query here';
const AGENT_IDS = [
  'plugin-1712327325', 'plugin-1713962163', 'plugin-1739951837', 
  'plugin-1713954536', 'plugin-1713958591', 'plugin-1713958830', 
  'plugin-1713961903', 'plugin-1713967141'
];

async function createChatSession() {
  try {
    const response = await axios.post('https://api-dev.on-demand.io/chat/v1/sessions', {
      agentIds: [],
      externalUserId: EXTERNAL_USER_ID
    }, {
      headers: {
        apikey: API_KEY
      }
    });

    if (response.status === 201) {
      return response.data.data.id;
    } else {
      throw new Error('Failed to create chat session');
    }
  } catch (error) {
    console.error('Error creating chat session:', error);
  }
}

async function submitQuery(sessionId) {
  try {
    const response = await axios.post(`https://api-dev.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
      endpointId: 'predefined-openai-gpt4o',
      query: QUERY,
      agentIds: AGENT_IDS,
      responseMode: 'sync',
      reasoningMode: 'medium'
    }, {
      headers: {
        apikey: API_KEY
      }
    });

    if (response.status === 200) {
      console.log('Query response:', response.data);
    } else {
      throw new Error('Failed to submit query');
    }
  } catch (error) {
    console.error('Error submitting query:', error);
  }
}

async function main() {
  const sessionId = await createChatSession();
  if (sessionId) {
    await submitQuery(sessionId);
  }
}

main();
```

This JavaScript code uses the Axios library to interact with the specified chat APIs. It first creates a chat session and then submits a query using the session ID obtained from the first API call.