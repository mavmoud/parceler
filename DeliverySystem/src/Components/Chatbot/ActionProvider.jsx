import React, { useState } from "react";

const ActionProvider = ({
  createChatBotMessage,
  setState,
  closeChatbot,
  children,
}) => {
  const [widgetNumber, setWidgetNumber] = useState(null);
  // Fetch tracking status
  const fetchTrackingStatus = async (trackingNumber) => {
    try {
      const response = await fetch(
        `https://api.parceler.mahmmk.com/api/orders/trackingNumber/${trackingNumber}`

      );
      if (response.ok) {
        const data = await response.json();

        const statusName =
          data.statusHistory.length > 0
            ? data.statusHistory[data.statusHistory.length - 1].statusName
            : data.order.latestStatusName;

        const statusMessage = createChatBotMessage(`Status: ${statusName}`);
        const followUpMessage = createChatBotMessage(
          "If you have another tracking number, please provide it. Otherwise, type 'end chat' to end the conversation."
        );

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, statusMessage, followUpMessage],
        }));
      } else {
        const notFoundMessage = createChatBotMessage(
          "Tracking number not found. Please try again."
        );
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, notFoundMessage],
        }));
      }
    } catch (error) {
      const errorMessage = createChatBotMessage(
        "Error fetching order status. Please try again."
      );
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  const fetchTrackingEstimate = async (trackingNumber) => {
    try {
      const response = await fetch(
        `https://api.parceler.mahmmk.com/api/orders/trackingNumber/${trackingNumber}`
      );
      if (response.ok) {
        const data = await response.json();

        const statusName =
          data.statusHistory.length > 0
            ? data.statusHistory[data.statusHistory.length - 1].statusName
            : data.order.latestStatusName;

        const estimatedDelivery =
          {
            "Package Delivered": "Delivered",
            "Out for Delivery": "1 day",
            "Package In Transit": "2-3 days",
            "Package Picked Up": "5-6 days",
            "Shipment Created": "6-10 days",
          }[statusName] || "N/A";

        const statusMessage = createChatBotMessage(
          `Estimated Delivery: ${estimatedDelivery}`
        );
        const followUpMessage = createChatBotMessage(
          "If you have another tracking number, please provide it. Otherwise, type 'end chat' to end the conversation."
        );

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, statusMessage, followUpMessage],
        }));
      } else {
        const notFoundMessage = createChatBotMessage(
          "Tracking number not found. Please try again."
        );
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, notFoundMessage],
        }));
      }
    } catch (error) {
      const errorMessage = createChatBotMessage(
        "Error fetching order status. Please try again."
      );
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  const fetchAmount = async (trackingNumber) => {
    try {
      const response = await fetch(
        `https://api.parceler.mahmmk.com/api/orders/trackingNumber/${trackingNumber}`
      );
      if (response.ok) {
        const data = await response.json();

        const amount = data.order.amount;
        const currency = data.order.currency;

        const statusMessage = createChatBotMessage(
          `Amount: ${amount} ${currency}`
        );
        const followUpMessage = createChatBotMessage(
          "If you have another tracking number, please provide it. Otherwise, type 'end chat' to end the conversation."
        );

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, statusMessage, followUpMessage],
        }));
      } else {
        const notFoundMessage = createChatBotMessage(
          "Tracking number not found. Please try again."
        );
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, notFoundMessage],
        }));
      }
    } catch (error) {
      const errorMessage = createChatBotMessage(
        "Error fetching order status. Please try again."
      );
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  const handleTrackPackageRequest = () => {
    const message = createChatBotMessage(
      "Please provide your tracking number."
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
    setWidgetNumber(1); // Set widgetNumber state
  };

  const handleTrackingEstimate = () => {
    const message = createChatBotMessage(
      "Please provide your tracking number."
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
    setWidgetNumber(2); // Set widgetNumber state
  };

  const handleAmount = () => {
    const message = createChatBotMessage(
      "Please provide your tracking number."
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
    setWidgetNumber(3); // Set widgetNumber state
  };

  const handleUserInput = (message) => {
    if (message.toLowerCase() === "end chat") {
      clearChat();
      closeChatbot();
    } else if (/^[A-Z0-9]+$/.test(message)) {
      // User input is valid tracking number
      if (widgetNumber === null) {
        const invalidMessage = createChatBotMessage(
          "Please select an option first."
        );
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, invalidMessage],
        }));
      } else if (widgetNumber === 1) {
        fetchTrackingStatus(message);
      } else if (widgetNumber === 2) {
        fetchTrackingEstimate(message);
      } else if (widgetNumber === 3) {
        fetchAmount(message);
      }
    } else {
      const invalidMessage = createChatBotMessage(
        "Invalid input. Please try again."
      );
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, invalidMessage],
      }));
    }
  };

  const clearChat = () => {
    setState((prev) => ({
      ...prev,
      messages: [], // Clear all messages
    }));
  };

  const showMainOptions = () => {
    const optionsMessage = createChatBotMessage("What would you like to do?", {
      widget: "options", // Trigger options widget
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, optionsMessage],
    }));
  };

  return (
    <div>
      {/* Pass actions to children */}
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          actions: {
            handleTrackPackageRequest,
            handleTrackingEstimate,
            handleAmount,
            handleUserInput,
            showMainOptions,
          },
        })
      )}
    </div>
  );
};

export default ActionProvider;
