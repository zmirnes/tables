import { createContext, useState, useEffect } from "react";
import { uid } from "uid";

const tables = [
  {
    id: 0,
    tableName: "Radnici u proizvodnji",
    columns: [
      {
        id: "ime",
        type: "text",
        name: "Ime",
        placeholder: "Unesite ime",
        disabled: true,
        filterName: "ime",
      },
      {
        id: "prezime",
        type: "text",
        name: "Prezime",
        placeholder: "Unesite prezime",
        disabled: true,
        filterName: "prezime",
      },
      {
        id: "satnica",
        type: "number",
        name: "Satnica",
        placeholder: "Unesite satnicu",
        disabled: true,
        filterName: "satnica",
      },
      {
        id: "datumPocetkaRada",
        type: "date",
        name: "Datum početka rada",
        value: Date.now(),
        disabled: true,
        filterName: "datumPocetkaRada",
      },
      {
        id: "mjestoStanovanja",
        type: "text",
        name: "Mjesto stanovanja",
        placeholder: "Unesite mjesto",
        disabled: true,
        filterName: "mjestoStanovanja",
      },
    ],
  },
];

const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [sortAsc, setSortAsc] = useState(true);
  const [tableData, setTableData] = useState(
    localStorage.getItem("tableData")
      ? JSON.parse(localStorage.getItem("tableData"))
      : []
  );
  const [filteredData, setFilteredData] = useState(tableData);

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);

  const addRow = (tableID) => {
    const editedTable = tables.find((table) => table.id === tableID);
    const newRow = { id: uid() };
    editedTable.columns.forEach((column) => (newRow[column.id] = ""));
    setTableData((prev) => {
      if (prev.length === 0) {
        prev.push({ id: tableID, rows: [newRow] });
        return [...prev];
      }
      if (prev.find((table) => table.id === tableID)) {
        const table = prev.find((table) => table.id === tableID);
        if (table.rows.some((row) => row.id === newRow.id)) return [...prev];
        prev.find((table) => table.id === tableID).rows.push(newRow);
        return [...prev];
      } else {
        prev.push({ id: tableID, rows: [newRow] });
        return [...prev];
      }
    });
  };

  const deleteRow = (tableID, rowID) => {
    setTableData((prev) => {
      return prev.map((table) => {
        if (table.id === tableID) {
          table.rows = table.rows.filter((row) => row.id !== rowID);
          return table;
        }
        return table;
      });
    });
  };

  const onChangeData = (tableID, rowID, fieldID, value) => {
    setTableData(() => {
      return tableData.map((table) => {
        if (table.id === tableID) {
          table.rows.forEach((row) => {
            if (row.id === rowID) {
              row[fieldID] = value;
            }
          });
          return table;
        }
        return table;
      });
    });
  };

  const filterHandler = (tableID, filters) => {
    const data = localStorage.getItem("tableData")
      ? JSON.parse(localStorage.getItem("tableData"))
      : [];

    setFilteredData(() => {
      return data.map((table) => {
        if (table.id === tableID) {
          table.rows = table.rows.filter((row) => {
            return Object.entries(filters).every(([key, filter]) => {
              if (filter.type === "text" && filter.value !== "") {
                return row[filter.filtername]
                  .toLowerCase()
                  .includes(filter.value.toLowerCase());
              }
              if (filter.type === "number" && filter.value !== "") {
                if (filter.filtername.slice(-2) === "Od") {
                  const filterName = filter.filtername.slice(0, -2);
                  return +row[filterName] >= +filter.value;
                }
                if (filter.filtername.slice(-2) === "Do") {
                  const filterName = filter.filtername.slice(0, -2);
                  return +row[filterName] <= +filter.value;
                }
              }
              if (filter.type === "date" && filter.value !== "") {
                if (filter.filtername.slice(-2) === "Od") {
                  const filterName = filter.filtername.slice(0, -2);
                  return row[filterName] >= filter.value;
                }
                if (filter.filtername.slice(-2) === "Do") {
                  const filterName = filter.filtername.slice(0, -2);
                  return row[filterName] <= filter.value;
                }
              }
              return true;
            });
          });
          return table;
        }
        return table;
      });
    });
  };

  const resetFilters = (tableID) => {
    const original = JSON.parse(localStorage.getItem("tableData")).find(
      (table) => table.id === tableID
    ).rows;
    setFilteredData((prev) => {
      return prev.map((table) => {
        if (table.id === tableID) {
          table.rows = original;
          return table;
        }
        return table;
      });
    });
  };

  const sortTable = (tableID, column) => {
    setFilteredData((prev) => {
      return prev.map((table) => {
        if (table.id === tableID) {
          //eslint-disable-next-line
          table.rows.sort((a, b) => {
            setSortAsc(!sortAsc);
            if (column.type === "text" || column.type === "date") {
              if (a[column.id] > b[column.id]) {
                return sortAsc ? 1 : -1;
              } else if (a[column.id] < b[column.id]) {
                return sortAsc ? -1 : 1;
              } else {
                return 0;
              }
            }
            if (column.type === "number") {
              if (sortAsc) {
                return b[column.id] - a[column.id];
              } else if (!sortAsc) {
                return a[column.id] - b[column.id];
              }
            }
          });
          return table;
        }
        return table;
      });
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        tables,
        tableData,
        addRow,
        onChangeData,
        deleteRow,
        filterHandler,
        resetFilters,
        filteredData,
        sortTable,
        sortAsc,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
