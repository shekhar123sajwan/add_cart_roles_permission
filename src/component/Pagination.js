import React, { useState, useEffect } from "react";

const Pagination = ({
  setCurrentPage,
  numberOfProductsOnPage,
  totalProducts,
}) => {
  const totalPages = Math.ceil(totalProducts / numberOfProductsOnPage);
  const [currentPage, setCurrent] = useState(1);

  useEffect(() => {
    if (currentPage < 1) setCurrent(1);
    else if (currentPage > totalPages) setCurrent(totalPages);
    else setCurrent(currentPage);
  }, [currentPage, totalPages]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationLinks = () => {
    let start = 1;
    let end = totalPages;

    // If total pages are less than or equal to 10, show all pages
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Adjust start and end for larger page sets
    if (currentPage <= 5) {
      end = 10;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 10;
      end = totalPages;
    } else {
      start = currentPage - 4;
      end = currentPage + 4;
    }

    const pageLinks = Array.from(
      { length: end - start + 1 },
      (_, i) => i + start
    );

    // Add ellipsis in the middle if necessary
    if (start > 1) {
      pageLinks.unshift("...");
    }
    if (end < totalPages) {
      pageLinks.push("...");
    }

    return pageLinks;
  };

  const pageLinks = getPaginationLinks();

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center">
        {/* Prev button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => {
              goToPage(1);
              setCurrent(1);
            }}
            disabled={currentPage === 1}
          >
            First
          </button>
        </li>

        {/* Render the pagination buttons */}
        {pageLinks.map((page, index) =>
          page === "..." ? (
            <li key={index} className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          ) : (
            <li
              key={index}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => {
                  goToPage(page);
                  setCurrent(page);
                }}
              >
                {page}
              </button>
            </li>
          )
        )}

        {/* Last button */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => {
              goToPage(totalPages);
              setCurrent(totalPages);
            }}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
