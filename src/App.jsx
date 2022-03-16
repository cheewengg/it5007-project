import React from "react";
import ReactDOM from "react-dom";

import { StockChart } from "./components/Main.jsx";

const App = () => {
  return (
    <div>
      <StockChart />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
