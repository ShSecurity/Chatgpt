const chatbot = new OpenAI('TU_CLAVE_DE_API_DE_OPENAI'); // Reemplaza con tu clave de API de OpenAI
const promptPrefix = 'Usuario: ';
const responsePrefix = 'Chatbot: ';

const chatLog = document.querySelector('#chat-log');
const chatInput = document.querySelector('#chat-input');
const chatSubmit = document.querySelector('#chat-submit');

chatSubmit.addEventListener('click', async () => {
  const userInput = chatInput.value;
  if (userInput) {
    logMessage(userInput, promptPrefix);
    const botResponse = await chatbot.complete({
      prompt: userInput,
      maxTokens: 50,
      n: 1,
      stop: '\n',
    });
    logMessage(botResponse.choices[0].text.trim(), responsePrefix);
  }
  chatInput.value = '';
});

function logMessage(message, prefix) {
  const messageNode = document.createElement('div');
  messageNode.className = 'chat-message ' + (prefix === responsePrefix ? 'bot-message' : '');
  messageNode.textContent = prefix + message;
  chatLog.appendChild(messageNode);
}
