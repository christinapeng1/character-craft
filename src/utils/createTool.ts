export const createToolIfNotExists = async (
  toolName: string,
  toolParameters: string,
  toolDescription: string,
  toolFallbackContent: string
) => {
  // Check if the tool exists
  try {
    const response = await fetch(
      `https://api.hume.ai/v0/evi/tools?name=${toolName}&restrict_to_most_recent=true`,
      {
        method: "GET",
        headers: {
          "X-Hume-Api-Key": import.meta.env.VITE_HUME_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) {
      // Tool does not exist, create it
      console.log(`Tool ${toolName} does not exist. Creating tool...`);
      await createTool(
        toolName,
        toolParameters,
        toolDescription,
        toolFallbackContent
      );
    } else if (response.status === 200) {
      const body = await response.json();
      if (body.tools_page && body.tools_page.length > 0) {
        console.log(`Tool ${toolName} already exists.`);
      } else {
        console.log(`Tool ${toolName} does not exist. Creating tool...`);
        await createTool(
          toolName,
          toolParameters,
          toolDescription,
          toolFallbackContent
        );
      }
    } else {
      console.error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error checking tool existence:", error);
  }
};

export const createTool = async (
  toolName: string,
  toolParameters: string,
  toolDescription: string,
  toolFallbackContent: string
) => {
  try {
    const response = await fetch("https://api.hume.ai/v0/evi/tools", {
      method: "POST",
      headers: {
        "X-Hume-Api-Key": import.meta.env.VITE_HUME_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: toolName,
        parameters: toolParameters,
        description: toolDescription,
        fallback_content: toolFallbackContent,
      }),
    });
    const body = await response.json();
    console.log("Tool created:", body);
  } catch (error) {
    console.error("Error creating tool:", error);
  }
};

// // Usage example:
const toolName = "change_color";
const toolParameters =
  '{"type": "object", "required": [], "properties": {"color": {"type": "string", "description": "The color to change into in hex code (e.g. #e6d7ff)"}}}';
const toolDescription =
  "This tool is invoked when the user requests to change the color theme.";
const toolFallbackContent =
  "Experiencing some difficulties trying to change the color.";

// createToolIfNotExists(
//   toolName,
//   toolParameters,
//   toolDescription,
//   toolFallbackContent
// );
