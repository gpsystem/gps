// This is a simple test to make sure compilation works

import * as React from "react";
import * as ReactDOM from "react-dom";

const TestComponent: React.FC = () => (
  <div>
    <h1>Hello world!</h1>
  </div>
);

ReactDOM.render(<TestComponent />, document.getElementById("app"));
