import { useTable, useSortBy, usePagination } from "react-table"; // Import useSortBy
import style from "./Pagination_Home.module.css";

import React from "react";

const Pagination_Home = ({
  pageIndex,
  pageOptions,
  canPreviousPage,
  canNextPage,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  pageSize,
  setPageSize,
  onChangeInSelect,
  onChangeInInput,
}) => {
  return (
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
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
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
  );
};

export default Pagination_Home;
