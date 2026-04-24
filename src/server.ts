Bun.serve({
	port: 8080,
	routes: {
		"/": Bun.file("./index.html"),
		"/meal-plan": (req) => {
			const mealPlan = Bun.file("./mastra/public/meal-plan.md");
			return new Response(mealPlan);
		},
	},
});

console.log("Server running at http://localhost:8080");
