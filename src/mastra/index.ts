import { Mastra } from "@mastra/core/mastra";
import { carnivoreAgent } from "./agents/carnivore-agent";
import { testWorkflow } from "./workflows/lidl-pdf-download-workflow";

export const mastra = new Mastra({
	agents: { carnivoreAgent },
	workflows: { testWorkflow },
});
