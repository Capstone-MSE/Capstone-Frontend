import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const userID = localStorage.getItem("userID") || "test";

  const handleMessage = async (message) => {
    try {
      const requestBody = new URLSearchParams();
      requestBody.append("user_id", "test");
      requestBody.append("prompt", message || "매출 분석해줄래?");

      console.log("Request Body:", requestBody.toString());

      const response = await fetch("http://100.25.242.208:8080/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody.toString(),
      });

      console.log("Response status:", response.status);

      const contentType = response.headers.get("Content-Type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        console.log("Response text:", textResponse);
        throw new Error("Unexpected response format");
      }

      console.log("Response data:", data);

      if (response.status === 422) {
        console.error("Detail:", data.detail);
      }

      const reply = data.response;
      console.log("Reply:", reply);

      const botMessage = createChatBotMessage(reply);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
