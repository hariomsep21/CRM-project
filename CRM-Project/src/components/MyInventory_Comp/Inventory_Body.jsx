import React, { useEffect, useState, useCallback } from "react";
import style from "./Inventory_Body.module.css";
import { FaRegUser, FaSearch } from "react-icons/fa";
import {
  MdRemoveRedEye,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { useTable, useSortBy, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import MyInventory_Create from "./MyInventory_Create/MyInventory_Create";
import Inventory_Header from "./Inventory_Header";
import PdfGenerator from "../PropertyDetails_comp/PdfGenerator";
import axios from "axios";
import MyInventory_Edit from "./MyInventory_Edit/MyInventory_Edit";
import EditCustomer from "../Customers_Comp/EditCustomer/EditCustomer";
import PropertyCustomer from "./PropertyCustomer/PropertyCustomer";

const Inventory_Body = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [reload, setReload] = useState(false);
  const [filter, setFilter] = useState({
    type: "All",
    inventorySearch: "",
  });
  const navigate = useNavigate();

  // Fetch data and apply filters
  // const fetchData = useCallback(() => {
  //   fetch("http://localhost:5000/myInventory")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       applyFilters(data); // Apply filters after fetching data
  //     });
  // }, []);

  const API_URL = "https://localhost:7062/";

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL + "api/CRMInventory");
      setData(response.data);
      applyFilters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  // Function to apply filters
  const applyFilters = (data) => {
    let filtered = data;

    // Apply type filter
    if (filter.type !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.propertyStatus.toLowerCase() === filter.type.toLowerCase()
      );
    }

    // Apply search filter
    if (filter.inventorySearch) {
      filtered = filtered.filter((item) =>
        item.address
          .toLowerCase()
          .includes(filter.inventorySearch.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleNewRecordAdded = () => {
    setReload((prev) => !prev);
  };

  const generatePDF = () => {
    const selectedData = filteredData.filter((row) =>
      selectedRows.includes(row.id)
    );
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [297, 210], // A4 page size in mm (width, height)
    });

    doc.setFontSize(16);
    doc.setFont("helvetica", "semi-bold");
    doc.text("Property Advice", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    const borderColor = [44, 62, 80];
    const tableColumnStyles = {
      cellPadding: 5,
      fontSize: 10,
      overflow: "linebreak",
      tableLineColor: borderColor,
      tableLineWidth: 0.75,
      margin: { top: 30 },
      styles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        lineWidth: 0.2,
        lineColor: borderColor,
      },
    };

    const tableBody = selectedData.map((row, index) => [
      index + 1,
      row.address,
      row.floor,
      row.bed,
      row.rent,
      row.plotSize,
      row.parkFacing ? "Yes" : "No",
      row.lift ? "Yes" : "No",
      row.stiltParking ? "Yes" : "No",
      row.staffRoom ? "Yes" : "No",
      row.remarks,
    ]);

    doc.autoTable({
      head: [
        [
          "S.No",
          "Address",
          "Floor",
          "Bed",
          "Rent",
          "Plot Size",
          "Park Facing",
          "Lift",
          "Stilt Parking",
          "Staff Room",
          "Remarks",
        ],
      ],
      body: tableBody,
      theme: "grid",
      ...tableColumnStyles,
    });

    doc.save("advice.pdf");
  };

  const columns = React.useMemo(
    () => [
      {
        Header: ({ getToggleAllRowsSelectedProps }) => {
          const allSelected = selectedRows.length === filteredData.length;
          const toggleAll = () => {
            if (allSelected) {
              setSelectedRows([]);
            } else {
              setSelectedRows(filteredData.map((row) => row.id));
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
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleRow();
              }}
            >
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
        accessor: "address",
        HeaderStyle: style.header_PropertyStyle,
        Cell: ({ value }) => (
          <div className={style.cell_PropertyStyle}>{value}</div>
        ),
      },
      {
        Header: "Floor",
        accessor: "floor",
        HeaderStyle: style.header_FloorStyle,
        Cell: ({ value }) => (
          <div className={style.cell_FloorStyle}>{value}</div>
        ),
      },
      {
        Header: "Bed",
        accessor: "bed",
        HeaderStyle: style.header_BedStyle,
        Cell: ({ value }) => <div className={style.cell_BedStyle}>{value}</div>,
      },
      {
        Header: "Plot Size",
        accessor: "plotSize",
        HeaderStyle: style.header_PlotSizeStyle,
        Cell: ({ value }) => (
          <div className={style.cell_PlotSizeStyle}>{value}</div>
        ),
      },
      {
        Header: "Rent",
        accessor: "rent",
        HeaderStyle: style.header_RentStyle,
        Cell: ({ value }) => (
          <div className={style.cell_RentStyle}>{value}</div>
        ),
      },
      {
        Header: "Park Facing",
        accessor: "parkFacing",
        HeaderStyle: style.header_ParkFacingStyle,
        Cell: ({ value }) => (
          <div className={style.cell_ParkFacingStyle}>
            {value ? "Yes" : "No"}
          </div>
        ),
      },
      {
        Header: "Lift",
        accessor: "lift",
        HeaderStyle: style.header_LiftStyle,
        Cell: ({ value }) => (
          <div className={style.cell_LiftStyle}>{value ? "Yes" : "No"}</div>
        ),
      },
      {
        Header: "Stilt Parking",
        accessor: "stiltParking",
        HeaderStyle: style.header_StiltParkingStyle,
        Cell: ({ value }) => (
          <div className={style.cell_StiltParkingStyle}>
            {value ? "Yes" : "No"}
          </div>
        ),
      },
      {
        Header: "Staff Room",
        accessor: "staffRoom",
        HeaderStyle: style.header_StaffRoomStyle,
        Cell: ({ value }) => (
          <div className={style.cell_StaffRoomStyle}>
            {value ? "Yes" : "No"}
          </div>
        ),
      },
      {
        Header: "Remarks",
        accessor: "remarks",
        HeaderStyle: style.header_RemarksStyle,
        Cell: ({ value }) => (
          <div className={style.cell_RemarksStyle}>{value}</div>
        ),
      },
      {
        Header: "",
        accessor: "action",
        HeaderStyle: style.header_headingNameStyle,
        Cell: ({ row }) => (
          <div
            className={style.actionIconsStyle}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <PropertyCustomer
              className={style.actionIcon}
              id={row.original.id}
            />
            <MdRemoveRedEye
              className={style.actionIconEye}
              onDoubleClick={() =>
                navigate(`/PropertyDetail/${row.original.id}`)
              }
              onClick={(e) => {
                console.log("Double-clicked on row", row.original.id);
              }}
            />
            <MyInventory_Edit
              className={style.actionIcon}
              id={row.original.id}
              onNewRecordAdded={handleNewRecordAdded}
            />
          </div>
        ),
      },
    ],
    [filteredData, selectedRows]
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
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 4 },
    },
    useSortBy,
    usePagination
  );

  const onChangeInSelect = (e) => {
    setPageSize(Number(e.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  const handleTypeChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const handleSearchChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      inventorySearch: e.target.value,
    }));
  };

  useEffect(() => {
    applyFilters(data);
  }, [filter, data]);

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
                <PdfGenerator></PdfGenerator>
              </div>
              <div className={`col-4 ${style.Div_addInventorybtn}`}>
                <MyInventory_Create onNewRecordAdded={handleNewRecordAdded} />{" "}
                {/* Pass the callback as a prop */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Inventory_Header
        onTypeChange={handleTypeChange}
        onSearchChange={handleSearchChange}
      />
      <section className="section_3 mt-4">
        <div className={style.tableContainer}>
          <table {...getTableProps()} className={style.table}>
            <thead>
              {headerGroups.map((headerGroup, headerGroupIndex) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroupIndex}
                >
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={columnIndex}
                      className={column.HeaderStyle}
                      style={{ width: column.width }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
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
                    {...row.getRowProps()}
                    key={rowIndex}
                    className={rowClassName}
                    onClick={() =>
                      navigate(`/PropertyDetail/${row.original.id}`)
                    }
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <td {...cell.getCellProps()} key={cellIndex}>
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
                {pageIndex >= 0 ? pageIndex + 1 : 0} of {pageOptions.length}
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
