import React, { useState, useEffect } from "react";
import style from "./Leads_Body.module.css";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveRedEye,
} from "react-icons/md";
import { useTable, useSortBy, usePagination } from "react-table";
import { FaRegUser } from "react-icons/fa6";
import axios from "axios";
import Edit_Leads from "../Edit_Leads/Edit_Leads";
import Leads_Header from "../Leads_Header/Leads_Header";
import { jsPDF } from "jspdf";

const Leads_Body = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState({
    type: "All",
    inventorySearch: "",
  });
  const token = sessionStorage.getItem("token");

  const API_URL = "https://localhost:7062/";
  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL + "api/CRMLead", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      applyFilters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // useEffect(() => {
  //   axios
  //     .get("https://localhost:7062/api/CRMLead")
  //     .then((response) => {
  //       console.log("API response:", response.data);
  //       setData(response.data);
  //       applyFilters(response.data);
  //       setRefresh(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [refresh]);

  const handleEditComplete = () => {
    setRefresh((prev) => !prev);
  };
  const handleNewRecordAdded = () => {
    setRefresh((prev) => !prev);
  };

  const applyFilters = (data) => {
    let filtered = data;

    // Apply type filter
    if (filter.type && filter.type !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.type && item.type.toLowerCase() === filter.type.toLowerCase()
      );
    }
    // Apply location filter
    if (filter.location) {
      filtered = filtered.filter(
        (item) =>
          item.location &&
          item.location.toLowerCase().includes(filter.location.toLowerCase())
      );
    }

    // Apply stage filter
    if (filter.stage) {
      filtered = filtered.filter(
        (item) =>
          item.stage &&
          item.stage.toLowerCase().includes(filter.stage.toLowerCase())
      );
    }

    // Apply area filter
    if (filter.area !== "" && !isNaN(filter.area)) {
      const areaValue = parseFloat(filter.area);
      filtered = filtered.filter((item) => {
        const itemArea = parseFloat(item.area);
        return !isNaN(itemArea) && itemArea === areaValue;
      });
    }

    // Apply date filter
    if (filter.dateFilter) {
      const today = new Date();
      const startDate = new Date();
      let endDate = new Date(today);

      switch (filter.dateFilter) {
        case "week":
          startDate.setDate(today.getDate() - today.getDay()); // Start of the week
          break;
        case "month":
          startDate.setDate(1); // Start of the month
          break;
        case "year":
          startDate.setMonth(0, 1); // Start of the year
          break;
        default:
          // No date filter, return all data
          break;
      }

      // Filter items based on the date range
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    // Apply search filter
    if (filter.inventorySearch) {
      filtered = filtered.filter(
        (item) =>
          item.property &&
          item.property
            .toLowerCase()
            .includes(filter.inventorySearch.toLowerCase())
      );
    }

    console.log("Filtered data:", filtered); // Debugging line
    setFilteredData(filtered);
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
    doc.text("Leads", doc.internal.pageSize.getWidth() / 2, 20, {
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
      row.type,
      row.property,
      row.name,
      row.location,
      row.date,
      row.askingPrice,
      row.titleCheck,
      row.area,
      row.remarks,
    ]);

    doc.autoTable({
      head: [
        [
          "S.No",
          "Type",
          "Property",
          "Name",
          "Location",
          "Date",
          "Asking Price",
          "TitleCheck",
          "Area",
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
            setSelectedRows((prevSelectedRows) => {
              if (isSelected) {
                return prevSelectedRows.filter((id) => id !== row.original.id);
              } else {
                return [...prevSelectedRows, row.original.id];
              }
            });
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
        Header: "Property",
        accessor: "property",
        HeaderStyle: style.header_PropertyStyle,
        Cell: ({ value }) => (
          <div className={style.cell_PropertyStyle}>{value}</div>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        HeaderStyle: style.header_headingNameStyle,
        Cell: ({ value, row }) => {
          const name = value;
          const mobile = row.original.mobile;
          return (
            <div
              className={style.cell_BodyNameStyle}
              dangerouslySetInnerHTML={{ __html: `${name}<br>${mobile}` }}
            />
          );
        },
      },
      {
        Header: "Location",
        accessor: "location",
        HeaderStyle: style.header_headingNameStyle,
        Cell: ({ value }) => (
          <div className={style.cell_BodyNameStyle}>{value}</div>
        ),
      },
      {
        Header: "Date",
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
        Cell: ({ value }) => (
          <div className={style.cell_BodyNameStyle}>{value} lac</div>
        ),
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
        Cell: ({ value }) => (
          <div className={style.cell_BodyNameStyle}>{value} sqft</div>
        ),
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
        Header: "Action",
        accessor: "action",
        HeaderStyle: style.header_headingNameStyle,
        Cell: ({ row }) => {
          return (
            <div className={style.actionIconsStyle}>
              <Edit_Leads
                data={row.original.id}
                onEditComplete={handleEditComplete}
              />
            </div>
          );
        },
      },
    ],
    [filteredData, selectedRows]
  );

  const handleTypeChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };
  const handleLocationChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      location: e.target.value,
    }));
  };
  const handleDateChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      dateFilter: e.target.value,
    }));
  };

  const handleAreaChange = (e) => {
    const value = e.target.value;
    // Ensure value is a number or empty string
    const numericValue = value === "" ? "" : parseFloat(value);
    setFilter((prev) => ({
      ...prev,
      area: numericValue,
    }));
  };

  const handleStageChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      stage: e.target.value,
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
  }, [data, filter]);
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
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  );
  const onChangeInSelect = (e) => {
    setPageSize(Number(e.target.value));
  };

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data: filteredData });

  return (
    <>
      <Leads_Header
        onTypeChange={handleTypeChange}
        onLocationChange={handleLocationChange}
        onAreaChange={handleAreaChange}
        onStageChange={handleStageChange}
        onSearchChange={handleSearchChange}
        onNewLeadAdd={handleNewRecordAdded}
        generatePDF={generatePDF}
      ></Leads_Header>
      <div className="container">
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
                        {...column.getHeaderProps()}
                        className={column.HeaderStyle}
                        style={{ width: column.width }}
                      >
                        {column.render("Header")}
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
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
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
      </div>
    </>
  );
};

export default Leads_Body;
