import React, { useContext } from "react";
import GlobalContext from "../Context/GlobalContext";
import classes from "./Table.module.css";

const Table = ({ table }) => {
  const { addRow, onChangeData, deleteRow, sortTable, filteredData } =
    useContext(GlobalContext);
  const t = filteredData.find((t) => t.id === table.id);

  return (
    <div className={classes.tableContainer}>
      <div className={classes.tableInfo}>
        <h3 className={classes.tableName}>{table.tableName}</h3>
        <button onClick={() => addRow(table.id)} className={classes.addBtn}>
          Dodaj
        </button>
      </div>
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr className={classes.tr}>
            {table.columns.map((column) => (
              <th
                className={classes.th}
                key={column.id}
                onClick={() => {
                  column.disabled &&
                    sortTable(table.id, { id: column.id, type: column.type });
                }}
              >
                <input
                  className={classes.columnName}
                  defaultValue={column.name}
                  disabled={column.disabled}
                />
              </th>
            ))}
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {t &&
            t.rows.map((row) => (
              <tr key={row.id} className={classes.tableRow}>
                {table.columns.map((column) => (
                  <td key={column.id} className={classes.td}>
                    <input
                      type={column.type}
                      placeholder={column.placeholder}
                      onBlur={(e) =>
                        onChangeData(
                          table.id,
                          row.id,
                          column.id,
                          e.target.value
                        )
                      }
                      defaultValue={row[column.id]}
                    />
                  </td>
                ))}
                <td className={classes.actions}>
                  <button onClick={() => deleteRow(table.id, row.id)}>
                    Delete row
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {t && t.rows.length === 0 && (
        <span className={classes.noDataText}>U tabeli nema podataka</span>
      )}
      {!t && <span className={classes.noDataText}>U tabeli nema podataka</span>}
    </div>
  );
};

export default Table;
