import { Mastra } from "@mastra/core/mastra";
import { carnivoreAgent } from "./agents/carnivore-agent";
import { mainWorkflow } from "./workflows/deal-finder-wokflow";

export const mastra = new Mastra({
	agents: { carnivoreAgent },
	workflows: { mainWorkflow },
});
