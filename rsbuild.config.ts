import path from "path";
import { defineConfig } from "@rsbuild/core";
import { pluginMdx } from "@rsbuild/plugin-mdx";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { recmaCodeHike, remarkCodeHike } from "codehike/mdx";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";

const chConfig = {
	components: { code: "CodeHike" },
};

export default defineConfig({
	html: {
		favicon: path.join(__dirname, "public/logo.svg"),
		template: path.join(__dirname, "index.html"),
	},
	source: {
		alias: {
			"@/": path.join(__dirname, "src"),
		},
		define: {
			"process.env": JSON.stringify(process.env),
		},
	},
	output: {
		distPath: {
			root: "dist",
		},
	},
	server: {
		port: 8888,
		proxy: {
			"/docker": {
				target: "http://127.0.0.1:2375",
				pathRewrite: { "^/docker": "" },
			},
		},
	},
	plugins: [
		pluginSass(),
		pluginMdx({
			mdxLoaderOptions: {
				remarkPlugins: [[remarkCodeHike, chConfig]],
				rehypePlugins: [rehypeSlug, rehypeToc],
				recmaPlugins: [[recmaCodeHike, chConfig]],
				jsx: true,
				providerImportSource: "@mdx-js/react",
			},
		}),
		pluginReact(),
	],
});
