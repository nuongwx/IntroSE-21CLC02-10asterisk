import React, { useState, useEffect } from "react";

const Table = ({ columns, data, onSort, sortColumn }) => {
    console.log("columns", columns);
    console.log("data", data);
  const [sortColumn2, setSortColumn] = useState(sortColumn);
  const [data2, setData] = useState(data);
  const [columns2, setColumns] = useState(columns);

  useEffect(() => {
    setSortColumn(sortColumn);
  }, [sortColumn]);

  useEffect(() => {
    setData(data);
  }, [data]);

  useEffect(() => {
    setColumns(columns);
  }, [columns]);

  const raiseSort = (path) => {
    const sortColumn2 = { ...sortColumn };
    if (sortColumn2.path === path)
      sortColumn2.order = sortColumn2.order === "asc" ? "desc" : "asc";
    else {
      sortColumn2.path = path;
      sortColumn2.order = "asc";
    }
    onSort(sortColumn2);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn2.path) return null;
    if (sortColumn2.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return item[column.path];
  };

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          {columns2.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => raiseSort(column.path)}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data2.map((item) => (
          <tr key={item._id}>
            {columns2.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;