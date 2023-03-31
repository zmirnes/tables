import React, { useContext, useState } from "react";
import GlobalContext from "../Context/GlobalContext";
import classes from "./FilterTable.module.css";

const FilterTable = ({ table }) => {
  const { filterHandler, resetFilters } = useContext(GlobalContext);
  const [showFilters, setShowFilters] = useState(false);

  const submitHandler = () => {
    const filterData = {};
    const filterInputs = document.querySelectorAll(".filterInput");
    filterInputs.forEach(
      (input) =>
        (filterData[input.getAttribute("filtername")] = {
          type: input.type,
          filtername: input.getAttribute("filtername"),
          value: input.value,
        })
    );
    filterHandler(table.id, filterData);
  };

  return (
    <div className={classes.filterContainer}>
      <div
        className={classes.filterHeading}
        onClick={() => setShowFilters(!showFilters)}
      >
        <span className={classes.filterTableName}>
          Filter za: {table.tableName}
        </span>
        <span className={showFilters ? classes.arrowUp : classes.arrowDown}>
          🔽
        </span>
      </div>
      {showFilters && (
        <div className={classes.filters}>
          {table.columns.map((column) => {
            if (column.type === "text") {
              return (
                <div key={column.id} className={classes.filter}>
                  <label htmlFor="">{column.name}</label>
                  <input
                    filtername={column.filterName}
                    type={column.type}
                    placeholder={column.placeholder}
                    className="filterInput"
                  />
                </div>
              );
            }
            if (column.type === "number") {
              return (
                <div key={column.id} className={classes.doubleFilter}>
                  <div className={classes.filter}>
                    <label htmlFor="">{column.name} od:</label>
                    <input
                      filtername={`${column.filterName}Od`}
                      type={column.type}
                      placeholder={`${column.name} od:`}
                      className="filterInput"
                    />
                  </div>
                  <div className={classes.filter}>
                    <label htmlFor="">{column.name} do:</label>

                    <input
                      filtername={`${column.filterName}Do`}
                      type={column.type}
                      placeholder={`${column.name} do:`}
                      className="filterInput"
                    />
                  </div>
                </div>
              );
            }
            if (column.type === "date") {
              return (
                <div key={column.id} className={classes.doubleFilter}>
                  <div className={classes.filter}>
                    <label htmlFor="">{column.name} od:</label>
                    <input
                      filtername={`${column.filterName}Od`}
                      type={column.type}
                      placeholder={`${column.name} od:`}
                      className="filterInput"
                    />
                  </div>
                  <div className={classes.filter}>
                    <label htmlFor="">{column.name} do:</label>
                    <input
                      filtername={`${column.filterName}Do`}
                      type={column.type}
                      placeholder={`${column.name} do:`}
                      className="filterInput"
                    />
                  </div>
                </div>
              );
            }
            return column;
          })}
          <div className={classes.actions}>
            <button className={classes.submitBtn} onClick={submitHandler}>
              Primijeni
            </button>
            <button
              className={classes.submitBtn}
              onClick={() => {
                resetFilters(table.id);
                const filterInputs = document.querySelectorAll(".filterInput");
                filterInputs.forEach((input) => (input.value = ""));
              }}
            >
              Poništi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTable;
