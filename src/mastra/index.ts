import { Mastra } from "@mastra/core/mastra";
import { carnivoreAgent } from "./agents/weather-agent";

export const mastra = new Mastra({
	agents: { carnivoreAgent },
});
