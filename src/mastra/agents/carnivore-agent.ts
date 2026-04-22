import { Agent } from "@mastra/core/agent";
import { Workspace, LocalFilesystem } from "@mastra/core/workspace";
import { dirname } from "node:path";

if (!process.env.SCREENSHOT_PATH) {
	throw new Error("SCREENSHOT_PATH environment variable is not set");
}

const workspaceBasePath = dirname(process.env.SCREENSHOT_PATH);

export const workspace = new Workspace({
	filesystem: new LocalFilesystem({
		basePath: workspaceBasePath,
	}),
});

export const carnivoreAgent = new Agent({
	id: "carnivore-agent",
	name: "Carnivore agent",
	instructions: `You are helpful deal finder, you goal is to find deals for carnivore diet people. Aka like eggs on discount and meats`,
	model: "openai/gpt-4o",
	workspace,
});

// Instrutciontns to be added when someome tells you open a webPage use the browser goto tool and then other like that to
