import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App greeting="Hello world!"/>, document.getElementById("root"));

registerServiceWorker();