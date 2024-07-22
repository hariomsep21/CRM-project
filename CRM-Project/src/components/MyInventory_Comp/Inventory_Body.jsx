import React, { useEffect, useState } from "react";
import style from "./Inventory_Body.module.css";
import { FaSearch } from "react-icons/fa";
import { useTable, useSortBy, usePagination } from "react-table";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the jsPDF autotable plugin
import "react-toastify/dist/ReactToastify.css";
import MyInventory_Create from "./MyInventory_Create/MyInventory_Create";
import Inventory_Header from "./Inventory_Header";

const Inventory_Body = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/myInventory")
        .then((res) => res.json())
        .then((data) => setData(data));
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const generatePDF = () => {
    const selectedData = data.filter((row) => selectedRows.includes(row.id));
    const doc = new jsPDF({
      orientation: "landscape", // Optional: Landscape orientation for wider content
      unit: "mm",
      format: [297, 210], // A4 page size in mm (width, height)
    });

    // Define common border color for both header and body
    const borderColor = [44, 62, 80]; // Change this to your desired color

    // Define table column styles
    const tableColumnStyles = {
      cellPadding: 5,
      fontSize: 10,
      overflow: "linebreak",
      tableLineColor: borderColor, // Border color for body cells
      tableLineWidth: 0.75, // Border width
      margin: { top: 10 },
      styles: {
        fillColor: [255, 255, 255], // No background color for cells
        textColor: [0, 0, 0], // Text color
      },
      headStyles: {
        fillColor: [255, 255, 255], // No background color for header
        textColor: [0, 0, 0], // Text color
        fontStyle: "bold", // Make header text bold
        lineWidth: 0.2, // Border width around header cells
        lineColor: borderColor, // Same border color as body cells
      },
    };

    const tableBody = selectedData.map((row, index) => [
      index + 1, // Serial number
      row.address,
      row.location,
      row.floor,
      row.bed,
      row.rent,
      row.plotSize,
      row.parkFacing,
      row.lift,
      row.stiltParking,
      row.staffRoom,
      row.remarks,
    ]);

    doc.autoTable({
      head: [
        [
          "S.No", // Serial Number header
          "Address",
          "Location",
          "Floor",
          "Bed",
          "Rent",
          "Plot Size",
          "ParkFacing",
          "Lift",
          "Stilt Parking",
          "Staff Room",
          "Remarks",
        ],
      ],
      body: tableBody,
      theme: "grid", // Use a grid theme for borders
      ...tableColumnStyles,
    });

    doc.save("advice.pdf");
  };

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
        accessor: "propertyStatus",
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
        accessor: (row) =>
          `${row.propertyType} ${row.address} ${row.location} Floor ${row.floor}`,
        HeaderStyle: style.header_PropertyStyle,
        Cell: ({ value }) => (
          <div className={style.cell_PropertyStyle}>{value}</div>
        ),
      },
      {
        Header: "Bed",
        accessor: "bed",
        HeaderStyle: style.header_headingNameStyle,
        Cell: ({ value }) => (
          <div className={style.cell_PropertyStyle}>{value}</div>
        ),
      },
      {
        Header: "Rent",
        accessor: "rent",
        HeaderStyle: style.header_headingNameStyle,
        Cell: ({ value }) => (
          <div className={style.cell_BodyNameStyle}>{value}</div>
        ),
      },
      {
        Header: "Plot Size",
        accessor: "plotSize",
        HeaderStyle: style.header_headingNameStyle,
      },
      {
        Header: "ParkFacing",
        accessor: "parkFacing",
        HeaderStyle: style.header_headingNameStyle,
      },
      {
        Header: "Lift",
        accessor: "lift",
        HeaderStyle: style.header_headingNameStyle,
      },
      {
        Header: "Stilt Parking",
        accessor: "stiltParking",
        HeaderStyle: style.header_headingNameStyle,
      },
      {
        Header: "Staff Room",
        accessor: "staffRoom",
        HeaderStyle: style.header_headingNameStyle,
      },
      {
        Header: "Remarks",
        accessor: "remarks",
        HeaderStyle: style.header_headingNameStyle,
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
      initialState: { pageIndex: 0, pageSize: 4 },
    },
    useSortBy,
    usePagination
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
      <section className="section_1 mt-3">
        <div className="row">
          <div className={`col-md-7 col-lg-7 ${style.inventory_heading}`}>
            My Inventory
          </div>
          <div className="col-md-5 col-lg-5">
            <div className={`row ${style.three_btn}`}>
              <div className={`col-4 ${style.Div_advicebtn}`}>
                <button
                  className={`btn ${style.advice_btn}`}
                  onClick={generatePDF}
                >
                  Generate Advice
                </button>
              </div>
              <div className={`col-4 ${style.Div_brochurebtn}`}>
                <button className={`btn ${style.brochure_btn}`}>
                  Generate Brochure
                </button>
              </div>
              <div className={`col-4 ${style.Div_addInventorybtn}`}>
                <MyInventory_Create />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Inventory_Header />
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
