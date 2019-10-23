import React from "react";
import reactDom from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

reactDom.render(<App/>, document.getElementById("root"));

registerServiceWorker();