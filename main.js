document.addEventListener('DOMContentLoaded', () => {
  const botui = new BotUI('chat-app', {
    vue: Vue,
  });
  let nativeLanguage = '';
  let targetLanguage = '';

  startChat();

  async function startChat() {
    const nativeLangResponse = await botui.action.text({
      action: {
        placeholder: "What's your native language?",
      },
    });

    nativeLanguage = nativeLangResponse.value;

    const targetLangResponse = await botui.action.text({
      action: {
        placeholder: 'What language do you want to learn?',
      },
    });

    targetLanguage = targetLangResponse.value;

    botui.message.add({
      content: `Great! Let's start learning ${targetLanguage} together. Feel free to ask me questions or request translations.`,
    });

    listenForUserInput();
  }

  async function listenForUserInput() {
    const userInput = await botui.action.text({
      action: {
        placeholder: 'Type your message here...',
      },
    });

    sendMessage(userInput.value);
  }

  async function sendMessage(message) {
    botui.message.add({
      human: true,
      content: message,
    });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    };

    const data = {
      model: 'text-davinci-002',
      prompt: `Translate the following message from ${nativeLanguage} to ${targetLanguage}: ${message}`,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 1,
      top_p: 1,
    };

    axios
      .post('https://api.openai.com/v1/engines/davinci-codex/completions', data, { headers: headers })
      .then((response) => {
        const translation = response.data.choices[0].text.trim();
        botui.message.add({
          content: translation,
        });
        listenForUserInput();
      })
      .catch((error) => {
        console.error(error);
        botui.message.add({
          content: 'An error occurred. Please try again later.',
        });
        listenForUserInput();
      });
  }
});
