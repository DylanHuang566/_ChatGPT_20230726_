const APIkey ="273730c6b10d41d49b8a3550a26e6ae1"
const ReqID ="4ffcac1c-b2fc-48ba-bd6d-b69d9942995a"
const projectName="TEST"
const deploymentName="20230719"
const APIurl = "https://luis-yunhui.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview"

function sendMessage(event) {
  if (event.keyCode === 13) {
    var userInput = document.getElementById("userInput");
    var message = userInput.value;

    // Clear the input field
    userInput.value = "";

    // Display user message
    displayMessage("user", message);

    // Send message to the chatbot
    sendMessageToBot(message);
  }
}

function sendMessageToBot(message) {
  // Create a new XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open("POST", APIurl);
  xhr.setRequestHeader("Ocp-Apim-Subscription-Key", APIkey);
  xhr.setRequestHeader("Apim-Request-Id", ReqID);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      // console.log(response)
      var topIntent = response.result.prediction.topIntent;
      console.log(topIntent)
      var reply
      switch (topIntent) {
    case '個人介紹':
        reply = "你不認識我啦，我是9527呀";
        break;
    case '再見':
        reply = "慢走不送！";
        break;
    case '專業技能':
        reply = "我的專業技能是惡魔果實能力者";
        break;
    case '工作經驗':
        reply = "在海上工作。";
        break;
    case '打招呼':
        reply = "出發啦，航向偉大航道";
        break;
    case '教育背景':
        reply = "海賊研究所";
        break;
    case '網站導覽':
        reply = "你有認真找嗎";
        break;
    case '聯絡方式':
        reply = "海鷗送信";
        break;
    case '職業目標':
        reply = "成為海賊王";
        break;
    case '開放性問題':
        reply = "說這麼多，做就對了";
        break;
    
    default:
        reply = "很抱歉，我無法理解您的請求。請再說一次或提供更多細節，我會盡力為您提供幫助。";
        break;
}


      // Display bot response
      displayMessage("bot", reply);
    }
  };

  // Set up the request payload
  var payload = JSON.stringify({
    "kind": "Conversation",
    "analysisInput": {
      "conversationItem": {
        "id": "1",
        "text": message,
        "modality": "text",
        "participantId": "user1"
      }
    },
    "parameters": {
      "projectName": projectName,
      "verbose": true,
      "deploymentName": deploymentName,
      "stringIndexType": "TextElement_V8"
    }
  });

  // Send the request
  xhr.send(payload);
}

function displayMessage(sender, message) {
  var chatbox = document.getElementById("chatbox");
  var newMessageContainer = document.createElement("div");
  var newMessage = document.createElement("p");
  newMessage.classList.add("chat-message");
  newMessage.classList.add(sender);
  newMessage.innerText = message;

  // Set the message style based on the sender
  if (sender === "user") {
    newMessageContainer.classList.add("user-message-container");
    newMessageContainer.appendChild(newMessage);
  } else if (sender === "bot") {
    newMessageContainer.classList.add("bot-message-container");
    var botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");
    botMessage.appendChild(newMessage);
    newMessageContainer.appendChild(botMessage);
  }

  chatbox.appendChild(newMessageContainer);

  // Scroll to the bottom of the chatbox
  chatbox.scrollTop = chatbox.scrollHeight;
}