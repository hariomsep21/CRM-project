import React from "react";
import style from "./Inventory_Body.module.css";
import { FaSearch } from "react-icons/fa";
import { useTable } from "react-table";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
const Inventory_Body = () => {
  const data = React.useMemo(
    () => [
      {
        id: 1,
        type: "Sell",
        property:
          "Agreement Sign - Mr. Chopra and Aggarwal - ATS - Sector 93, Noida",
        name: "Mr. Gupta   +91 9856487965",
        location: "Border st. nicholasville, ky",
        date: "10:01:32 am 14/12/23",
        askingPrice: "3.5 CR",
        titleCheck: "Clear",
        area: "5000 Sqft",
        stage: "Advance",
        remarks:
          "1200Y  Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        id: 2,
        type: "Rental",
        property:
          "Lease Agreement - Ms. Singh and Mr. Mehta - Green Park - New Delhi",
        name: "Ms. Verma   +91 9876543210",
        location: "West st. louisville, ky",
        date: "11:45:50 am 20/11/23",
        askingPrice: "1.2 CR",
        titleCheck: "Pending",
        area: "3000 Sqft",
        stage: "Initial",
        remarks:
          "1500Y  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 3,
        type: "Rental",
        property:
          "Lease Agreement - Ms. Singh and Mr. Mehta - Green Park - New Delhi",
        name: "Ms. Verma   +91 9876543210",
        location: "West st. louisville, ky",
        date: "11:45:50 am 20/11/23",
        askingPrice: "1.2 CR",
        titleCheck: "Pending",
        area: "3000 Sqft",
        stage: "Initial",
        remarks:
          "1500Y  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 4,
        type: "Rental",
        property:
          "Lease Agreement - Ms. Singh and Mr. Mehta - Green Park - New Delhi",
        name: "Ms. Verma   +91 9876543210",
        location: "West st. louisville, ky",
        date: "11:45:50 am 20/11/23",
        askingPrice: "1.2 CR",
        titleCheck: "Pending",
        area: "3000 Sqft",
        stage: "Initial",
        remarks:
          "1500Y  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        id: 5,
        type: "Rental",
        property:
          "Lease Agreement - Ms. Singh and Mr. Mehta - Green Park - New Delhi",
        name: "Ms. Verma   +91 9876543210",
        location: "West st. louisville, ky",
        date: "11:45:50 am 20/11/23",
        askingPrice: "1.2 CR",
        titleCheck: "Pending",
        area: "3000 Sqft",
        stage: "Initial",
        remarks:
          "1500Y  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: () => (
          <MdCheckBoxOutlineBlank className={style.header_CheckBox} />
        ),
        accessor: "checkbox",
        HeaderStyle: style.header_CheckIconStyle,
        Cell: () => <MdCheckBoxOutlineBlank className={style.cell_CheckBox} />,
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
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
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
                {rows.map((row, rowIndex) => {
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
          </div>
        </section>
      </div>
    </>
  );
};

export default Inventory_Body;
