import React, { useEffect, useState } from "react";
import style from "./Inventory_Body.module.css";
import { FaSearch } from "react-icons/fa";
import { useTable, useSortBy, usePagination } from "react-table"; // Import useSortBy
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md"; // Import MdCheckBox
import { FaRegUser } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";

const Inventory_Body = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/myInventory")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: ({ getToggleAllRowsSelectedProps }) => {
          const allSelected = selectedRows.length === data.length;
          const toggleAll = () => {
            if (allSelected) {
              setSelectedRows([]);
            } else {
              setSelectedRows(data.map((row) => row.id));
            }
          };
          return (
            <div onClick={toggleAll} className={style.header_CheckIconStyle}>
              {allSelected ? (
                <MdCheckBox className={style.header_CheckBox} />
              ) : (
                <MdCheckBoxOutlineBlank className={style.header_CheckBox} />
              )}
            </div>
          );
        },
        width: "74px",
        accessor: "checkbox",
        Cell: ({ row }) => {
          const isSelected = selectedRows.includes(row.original.id);
          const toggleRow = () => {
            if (isSelected) {
              setSelectedRows(
                selectedRows.filter((id) => id !== row.original.id)
              );
            } else {
              setSelectedRows([...selectedRows, row.original.id]);
            }
          };
          return (
            <div onClick={toggleRow}>
              {isSelected ? (
                <MdCheckBox className={style.cell_CheckBox} />
              ) : (
                <MdCheckBoxOutlineBlank className={style.cell_CheckBox} />
              )}
            </div>
          );
        },
      },
      {
        Header: "Type",
        accessor: "type",
        HeaderStyle: style.header_TypeStyle,
        Cell: ({ value }) => (
          <div
            className={`${
              value === "Sell" ? style.Cell_TypeSell : style.Cell_TypeRental
            }`}
          >
            {value}
          </div>
        ),
      },
      {
        Header: "Address",
        accessor: "property",
        HeaderStyle: style.header_PropertyStyle,
        Cell: ({ value }) => (
          <div className={style.cell_PropertyStyle}>{value}</div>
        ),
      }, // Different header style
      {
        Header: "Name",
        accessor: "name",
        HeaderStyle: style.header_headingNameStyle,
        Cell: ({ value }) => {
          const [name, phone] = value.split(/\s{3,}/);
          return (
            <div
              className={style.cell_BodyNameStyle}
              dangerouslySetInnerHTML={{ __html: `${name}<br>${phone}` }}
            />
          );
        },
      },
      {
        Header: "Modify Date",
        accessor: "date",
        HeaderStyle: style.header_headingNameStyle,
        Cell: ({ value }) => (
          <div className={style.cell_BodyNameStyle}>{value}</div>
        ),
      },
      {
        Header: "Asking Price",
        accessor: "askingPrice",
        HeaderStyle: style.header_headingNameStyle,
      },
      {
        Header: "Title Check",
        accessor: "titleCheck",
        HeaderStyle: style.header_headingNameStyle,
      },
      {
        Header: "Area",
        accessor: "area",
        HeaderStyle: style.header_headingNameStyle,
      },
      {
        Header: "Stage",
        accessor: "stage",
        HeaderStyle: style.header_headingNameStyle,
      },
      {
        Header: "Remarks",
        accessor: "remarks",
        HeaderStyle: style.header_PropertyStyle,
      },
      {
        Header: " ",
        accessor: "action",
        HeaderStyle: style.header_headingNameStyle,
        Cell: () => (
          <div className={style.actionIconsStyle}>
            <FaRegUser className={style.actionIcon} />
            <MdRemoveRedEye className={style.actionIconEye} />
            <BiSolidPencil className={style.actionIcon} />
          </div>
        ),
      },
    ],
    [data, selectedRows]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 4 }, // Initial page size of 4
    },
    useSortBy,
    usePagination // Hook that enables sorting and pagination
  );

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <>
      <section className="section_3 mt-4">
        <div className={style.tableContainer}>
          <table {...getTableProps()} className={style.table}>
            <thead>
              {headerGroups.map((headerGroup, headerGroupIndex) => (
                <tr
                  key={headerGroupIndex}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      {...column.getHeaderProps(column.getSortByToggleProps())} // Enable sorting for each column
                      className={column.HeaderStyle}
                      style={{ width: column.width }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? "" : "") : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, rowIndex) => {
                prepareRow(row);
                const rowClassName =
                  rowIndex % 2 === 0 ? `${style.evenRow}` : `${style.oddRow}`;
                return (
                  <tr
                    key={rowIndex}
                    {...row.getRowProps()}
                    className={rowClassName}
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <td key={cellIndex} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={style.pagination}>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            {/* <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={onChangeInInput}
                style={{ width: "100px" }}
              />
            </span>{" "} */}
            <select value={pageSize} onChange={onChangeInSelect}>
              {[4, 10, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inventory_Body;
