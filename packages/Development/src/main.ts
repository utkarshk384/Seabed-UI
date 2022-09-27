import App from "./App.svelte";
import "../../components/src/build.css";

import "./index.css";
const app = new App({
	target: document.getElementById("app"),
});

export default app;
