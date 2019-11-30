import React from "react";
import Router from "./Router";

import { RestfulProvider } from "restful-react";

function App() {
  return (
    <RestfulProvider base="http://85.206.134.3:7000">
      <Router />
    </RestfulProvider>
  );
}

export default App;
