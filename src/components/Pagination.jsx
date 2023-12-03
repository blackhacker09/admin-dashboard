import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (
        <div className="Pagination-div">
            <button
                onClick={() => handlePageChange(1)}
                className="first-button"
                disabled={currentPage === 1}
            >
                First
            </button>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="Previous-button"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`page-button ${
                        currentPage === page ? "active" : ""
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="Next-button"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
            <button
                onClick={() => handlePageChange(totalPages)}
                className="Last-button"
                disabled={currentPage === totalPages}
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;
