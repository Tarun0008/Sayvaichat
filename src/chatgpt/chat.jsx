import React, { useState } from 'react';
import './chat.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";
const systemMessage = { "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience." };

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSkills, setSelectedSkills] = useState('');
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState(0);
  const [llmProvider, setLLMProvider] = useState('');
  const [snippetCopied, setSnippetCopied] = useState(false); // State to track if snippet is copied
  const [codeSnippet, setCodeSnippet] = useState(''); // State to store the code snippet

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSend = () => {
    const newMessage = {
      message: feedback,
      direction: 'outgoing',
      sender: 'user',
    };
  
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
  
    setIsTyping(true);
    setStep(3); // Move to step 3 to display the code snippet immediately
  
    // Set the code snippet based on user input
    const snippet = `
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <!-- ... -->
    <script src="http://54.173.30.202:8000/copilot/index.js"></script>
    <script>
      window.mountChainlitWidget({
        chainlitServer: "http://54.173.30.202:8000",
      });
    </script>
  </body>`;
    
    setCodeSnippet(snippet);
  };
  

  async function processMessageToChatGPT(chatMessages) {
    // Format messages for chatGPT API
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === 'ChatGPT' ? 'assistant' : 'user';
      return { role: role, content: messageObject.message };
    });
    // Get the last user message as the prompt
    const userMessages = chatMessages.filter(messageObject => messageObject.sender === 'user');
    const lastUserMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1].message : '';

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
      config: {
        llm: [
          {
            provider: llmProvider,
            llm_name: selectedModel,
            temperature: 0.7,
            max_length: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }
        ],
        tools: [
          {
            tool_name: selectedSkills,
          }
        ]
      },
      prompt: lastUserMessage
    };

    try {
      const response = await fetch('http://54.173.30.202:5000/create', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestBody),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.responseKey) {
          console.log("API call successful");
          console.log(data.responseKey);
          setCodeSnippet(data.responseKey); // Set the code snippet
          setSnippetCopied(false); // Reset snippet copied state
          setStep(3); // Move to step 3 to display the code snippet
        } else {
          console.log("Response data is not in the expected format");
        }
      } else {
        console.log("API call failed");
      }
      setIsTyping(false);
    } catch (error) {
      console.error("An error occurred during the API call:", error);
    }
  }

  const copySnippet = () => {
    navigator.clipboard.writeText(codeSnippet)
      .then(() => {
        setSnippetCopied(true);
        setTimeout(() => setSnippetCopied(false), 3000); // Reset copied state after 3 seconds
      })
      .catch((error) => console.error("Failed to copy:", error));
  };

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <label>LLM Provider:</label>
            <select
              value={llmProvider}
              onChange={(e) => setLLMProvider(e.target.value)}
            >
              <option value="provider1">Select the Provider</option>
              <option value="openai">OpenAi</option>
            </select>
            &nbsp;&nbsp;&nbsp;
            <label>Model Name:</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="model1">Select the model name</option>
              <option value="gpt3.5">gpt-3.5-turbo</option>
            </select>
            <br/>
            <button onClick={handleNextStep}>Next</button>
          </div>
        );
      case 1:
        return (
          <div>
            <label>Choose the Skill Needed:</label>
            <select
              value={selectedSkills}
              onChange={(e) => setSelectedSkills(e.target.value)}
            >
              <option value="skill1">Select the skills</option>
              <option value="wiki">Wikipeida</option>
              <option value="arvix">Arvix</option>
            </select>
            <br/>
            <button onClick={handleNextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h4>What Your Bot Should Do:</h4>
            <br/>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <br/>
            <button onClick={handleSend}>Submit</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h4>Generated Code Snippet:</h4>
            {/* Display the code snippet */}
            <pre>
              <code>
                {codeSnippet}
              </code>
            </pre>
            {/* Render copy button */}
            <button onClick={copySnippet}>{snippetCopied ? "Copied!" : "Copy"}</button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderSteps()}</div>;
};

export default Chat;
