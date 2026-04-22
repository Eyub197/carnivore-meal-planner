import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import type { AgentBrowser } from "@mastra/agent-browser";

export const browserScreenshotTool = (browser: AgentBrowser) =>
	createTool({
		id: "browser_screenshot",
		description:
			"This tools goal is to take a picutre of the current browser page",
		inputSchema: z.object({}),
		execute: async (input, { agent }) => {
			const threadId = agent?.threadId;
			browser.setCurrentThread(threadId);
			await browser.ensureReady();
			const result = await browser.evaluate({ script: "" }, threadId);
		},
	});
