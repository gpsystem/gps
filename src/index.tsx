// This is a simple test to make sure compilation works

import * as React from "react";
import * as ReactDOM from "react-dom";

class TestComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello world!</h1>
      </div>
    );
  }
}

ReactDOM.render(<TestComponent />, document.getElementById("app"));
