import React, { useEffect } from "react";
import style from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange, className }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && currentPage > 1) {
        onPageChange(currentPage - 1);
      } else if (event.key === "ArrowRight" && currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className={className}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${style.leftArrow}`}
      >
        &lt;
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${style.rightArrow}`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
