import { VscodeDemo } from "./demo.js";
import { VscodeDevToolbar } from "./dev-toolbar.js";
import { VscodeThemeSelector } from "./theme-selector.js";
import { VscodeToggleMotion } from "./toggle-motion.js";
import { VscodeToggleUnderline } from "./toggle-underline.js";
import { VscodeViewContainerSelector } from "./view-container-selector.js";

import "@vscode-elements/elements/dist/vscode-button";
import "@vscode-elements/elements/dist/vscode-tabs";
import "@vscode-elements/elements/dist/vscode-tab-header";
import "@vscode-elements/elements/dist/vscode-tab-panel";

customElements.define("vscode-demo", VscodeDemo);
customElements.define("vscode-dev-toolbar", VscodeDevToolbar);
customElements.define("vscode-theme-selector", VscodeThemeSelector);
customElements.define("vscode-toggle-motion", VscodeToggleMotion);
customElements.define("vscode-toggle-underline", VscodeToggleUnderline);
customElements.define(
	"vscode-view-container-selector",
	VscodeViewContainerSelector,
);

class MyElement extends HTMLElement {
	constructor() {
		super();
		this.style.background = "#00ff00";
		console.log("Created custom element!");
	}
}

function addCustomElement() {
	customElements.define("my-element", MyElement);
	console.log("Added MyElement to custom element registry!");
}

addCustomElement();
