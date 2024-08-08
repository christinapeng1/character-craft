import { darkenColor } from "../../utils/adjustColor";

/**
 * Handles a tool call and performs color theme changes based on the tool call name and parameters.
 * @param {object} toolCall - The tool call object.
 * @param {function} setAssistantMessageColor - The function to set the assistant's color theme.
 * @param {function} setUserMessageColor - The function to set the user's color theme.
 * @returns {object} - The tool response object or tool error object.
 */
const handleToolCall = async (
  toolCall,
  setAssistantMessageColor,
  setAssistantBorderColor,
  setUserMessageColor,
  setUserBorderColor
) => {
  console.log("Tool call received", toolCall);

  if (toolCall.name === "change_color_theme") {
    try {
      const args = JSON.parse(toolCall.parameters);
      if (args && args.assistant_message_color && args.user_message_color) {
        console.log(
          `Color ${args.assistant_message_color} and ${args.user_message_color}.`
        );
        setAssistantMessageColor(args.assistant_message_color); // Set the assistant's color theme.
        localStorage.setItem(
          "assistant_message_color",
          args.assistant_message_color
        );
        const assistantBorderColor = darkenColor(args.assistant_message_color, 15);
        setAssistantBorderColor(assistantBorderColor); // Set the assistant's border color.
        localStorage.setItem("assistant_border_color", assistantBorderColor);

        setUserMessageColor(args.user_message_color); // Set the user's color theme.
        localStorage.setItem("user_message_color", args.user_message_color);

        const userBorderColor = darkenColor(args.user_message_color, 15);
        setUserBorderColor(userBorderColor); // Set the user's border color.
        localStorage.setItem("user_border_color", userBorderColor);
        return {
          type: "tool_response",
          tool_call_id: toolCall.tool_call_id,
          content: JSON.stringify({ success: true }),
        };
      }
    } catch (error) {
      console.error("Error changing to a color theme:", error);
      return {
        type: "tool_error",
        tool_call_id: toolCall.tool_call_id,
        error: "Color change error",
        code: "color_change_error",
        level: "warn",
        content:
          "The writer's assistant is temporarily unable to change colors.",
      };
    }
  } else if (toolCall.name === "change_assistant_message_color") {
    try {
      const args = JSON.parse(toolCall.parameters);
      if (args && args.assistant_message_color) {
        console.log(`Color ${args.assistant_message_color}.`);
        setAssistantMessageColor(args.assistant_message_color); // Set the assistant's color theme.
        localStorage.setItem(
          "assistant_message_color",
          args.assistant_message_color
        );

        const assistantBorderColor = darkenColor(
          args.assistant_message_color,
          15
        );
        setAssistantBorderColor(assistantBorderColor); // Set the assistant's border color.
        localStorage.setItem("assistant_border_color", assistantBorderColor);
        return {
          type: "tool_response",
          tool_call_id: toolCall.tool_call_id,
          content:
            "changed the assistant's color, let's continue the conversation",
        };
      }
    } catch (error) {
      console.error("Error changing to a color theme:", error);
      return {
        type: "tool_error",
        tool_call_id: toolCall.tool_call_id,
        error: "Color change error",
        code: "color_change_error",
        level: "warn",
        content:
          "The writer's assistant is temporarily unable to change colors.",
      };
    }
  } else if (toolCall.name === "change_user_message_color") {
    try {
      const args = JSON.parse(toolCall.parameters);
      if (args && args.user_message_color) {
        console.log(`Color ${args.user_message_color}.`);
        setUserMessageColor(args.user_message_color); // Set the user's color theme.
        localStorage.setItem("user_message_color", args.user_message_color);

        const userBorderColor = darkenColor(args.user_message_color, 15);
        setUserBorderColor(userBorderColor); // Set the user's border color.
        localStorage.setItem("user_border_color", userBorderColor);
        return {
          type: "tool_response",
          tool_call_id: toolCall.tool_call_id,
          content: "changed the user's color, let's continue the conversation",
        };
      }
    } catch (error) {
      console.error("Error changing to a color theme:", error);
      return {
        type: "tool_error",
        tool_call_id: toolCall.tool_call_id,
        error: "Color change error",
        code: "color_change_error",
        level: "warn",
        content:
          "The writer's assistant is temporarily unable to change colors.",
      };
    }
  }
};

export default handleToolCall;
