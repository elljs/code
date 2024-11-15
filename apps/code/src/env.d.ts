/// <reference types="@rsbuild/core/types" />

import { DOMAttributes, MutableRefObject } from "react";
// Import custom element definition classes
import {
	VscodeButton,
	VscodeTabHeader,
	VscodeTabPanel,
	VscodeTabs,
} from "@vscode-elements/elements";

type CustomElement<T> = Partial<
	T & DOMAttributes<T> & { children: any } & MutableRefObject
>;

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			["vscode-button"]: CustomElement<VscodeButton>;
			["vscode-tabs"]: CustomElement<VscodeTabs>;
			["vscode-tab-header"]: CustomElement<VscodeTabHeader>;
			["vscode-tab-panel"]: CustomElement<VscodeTabPanel>;
		}
	}
}

declare module "*.md" {
	let MDXComponent: () => JSX.Element;
	export default MDXComponent;
}
declare module "*.mdx" {
	let MDXComponent: () => JSX.Element;
	export default MDXComponent;
}

