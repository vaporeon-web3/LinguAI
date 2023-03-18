document.addEventListener('DOMContentLoaded', () => {
  const botui = new BotUI('chat-app');
  let nativeLanguage = "";
  let targetLanguage = "";

  startChat();

  async function startChat() {
    const nativeLangResponse = await botui.action.text({
      action: {
        placeholder: "What's your native language?"
      }
    });

    nativeLanguage = nativeLangResponse.value;

    const targetLangResponse = await botui.action.text({
      action: {
        placeholder: "What language do you want to learn?"
      }
    });

    targetLanguage = targetLangResponse.value;

    botui.message.add({
      content: `Great! Let's start learning ${targetLanguage} together. Feel free to ask me questions or request translations.`
    });

    listenForUserInput();
  }

  async function listenForUserInput() {
    const userInput = await botui.action.text({
      action: {
        placeholder: "Type your message here..."
      }
    });

    sendMessage(userInput.value);
  }

  async function sendMessage(message) {
    botui.message.add({
      human: true,
      content: message
    });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    };

    const data = {
      model
