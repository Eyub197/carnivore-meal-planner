import { createWorkflow } from "@mastra/core/workflows";
import { createStep } from "@mastra/core/workflows/evented";
import { chromium } from "playwright";
import { z } from "zod";

const getActiveLinkPages = createStep({
	id: "get-lidl-broshure-page",
	description: "Gets the current active broushres from lidl.bg",
	inputSchema: z.object({}),
	outputSchema: z.object({ urls: z.array(z.string()) }),

	execute: async () => {
		const urls: string[] = [];

		const res = await fetch("https://www.lidl.bg/c/broshuri/s10020060");
		const text = await res.text();
		const matches = text.matchAll(/href="([^"]*\/l\/bg\/broshura\/[^"]*)"/g);

		for (const match of matches) {
			urls.push(match[1]);
		}

		return { urls };
	},
});

const downloadBroshurePdfs = createStep({
	id: "download-pdfs",
	description: "Gets links with active broshures and downloads pdfs",
	inputSchema: z.object({ urls: z.array(z.string()) }),
	outputSchema: z.object({ paths: z.array(z.string()) }),

	execute: async ({ inputData: { urls } }) => {
		const paths: string[] = [];
		const browser = await chromium.launch();
		try {
			for (const [index, url] of urls.entries()) {
				const page = await browser.newPage();
				await page.goto(url);

				if (await page.locator("text='ПРИЕМАНЕ'").isVisible()) {
					await page.click("text='ПРИЕМАНЕ'");
				}
				// maybe fix the download stuff. Idk
				await page.click('[aria-label="Меню"]');
				const download = await page.waitForEvent("download");
				await page.click('text="Свали PDF"');
				await download.saveAs(`./lib/broshura-${index}.pdf`);
				paths.push(`./lib/broshura-${index}.pdf`);
			}
		} catch (error) {
			console.error(error);
		} finally {
			await browser.close();
		}

		return { paths };
	},
});

export const testWorkflow = createWorkflow({
	id: "test",
	inputSchema: z.object({}),
	outputSchema: z.object({ paths: z.array(z.string()) }),
})
	.then(getActiveLinkPages)
	.then(downloadBroshurePdfs)
	.commit();
