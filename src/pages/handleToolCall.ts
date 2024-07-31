/**
 * Handles a tool call and performs color theme changes based on the tool call name and parameters.
 * @param {object} toolCall - The tool call object.
 * @param {function} setAssistantColorTheme - The function to set the assistant's color theme.
 * @param {function} setUserColorTheme - The function to set the user's color theme.
 * @returns {object} - The tool response object or tool error object.
 */
const handleToolCall = async (
  toolCall,
  setAssistantColorTheme, 
  setUserColorTheme
) => {
  console.log("Tool call received", toolCall);

  if (toolCall.name === "change_color_theme") {
    try {
      const args = JSON.parse(toolCall.parameters);
      if (args && args.assistant_message_color && args.user_message_color) {
        console.log(
          `Color ${args.assistant_message_color} and ${args.user_message_color}.`
        );
        setAssistantColorTheme(args.assistant_message_color); // Set the assistant's color theme.
        localStorage.setItem(
          "assistant_color_theme",
          args.assistant_message_color
        );
        setUserColorTheme(args.user_message_color); // Set the user's color theme.
        localStorage.setItem("user_color_theme", args.user_message_color);
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
        setAssistantColorTheme(args.assistant_message_color); // Set the assistant's color theme.
        localStorage.setItem(
          "assistant_color_theme",
          args.assistant_message_color
        );
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
        setUserColorTheme(args.user_message_color); // Set the user's color theme.
        localStorage.setItem("user_color_theme", args.user_message_color);
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
