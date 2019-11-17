import * as React from "react";

interface HelloProps { greeting: string };

const App = (props: HelloProps) => <div>{props.greeting}</div>;

export default App;