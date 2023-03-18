const botui = new BotUI('chat-app');
const openaiApiKey = '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';

botui.message.add({
  content: 'Hello! I am LinguAI. I can help you learn a new language. Please tell me your native language.'
}).then(() => {
  botui.action.text({
    action: {
      placeholder: 'Enter your native language'
    }
  }).then((res) => {
    document.getElementById('nativeLanguage').textContent = res.value;

    botui.message.add({
      content: 'Great! Now, please tell me the language you want to learn.'
    }).then(() => {
      botui.action.text({
        action: {
          placeholder: 'Enter the language you want to learn'
        }
      }).then((res) => {
        document.getElementById('targetLanguage').textContent = res.value;

        botui.message.add({
          content: 'Thank you! Now we can start learning. Feel free to ask me any questions or request translations.'
        });
      });
    });
  });
});
