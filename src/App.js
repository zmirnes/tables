import React, { useContext } from "react";
import FilterTable from "./Components/FilterTable";
import Table from "./Components/Table";
import GlobalContext from "./Context/GlobalContext";

const App = () => {
  const { tables } = useContext(GlobalContext);

  return (
    <div>
      <FilterTable table={tables[0]} />
      <Table table={tables[0]} />
    </div>
  );
};

export default App;
