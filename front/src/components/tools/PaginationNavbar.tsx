import React from "react";

interface PaginationNavbarProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<any>>;
    pageNumbers: number[];
    pageCount: number | undefined;
}

const PaginationNavbar = ({
    currentPage,
    setCurrentPage,
    pageNumbers,
    pageCount,
}: PaginationNavbarProps) => {
    return (
        <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
            <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
                {/* Previous Page */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="flex items-center pt-3 text-gray-600 hover:text-main cursor-pointer"
                >
                    <svg
                        width={14}
                        height={8}
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.1665 4H12.8332"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.1665 4L4.49984 7.33333"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.1665 4.00002L4.49984 0.666687"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <p className="text-sm ml-3 font-medium leading-none ">
                        Previous
                    </p>
                </button>

                {/* Page Numbers */}
                <div className="sm:flex hidden">
                    {pageNumbers.map((number) => (
                        <p
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`pt-3 mr-4 px-2 text-sm font-medium leading-none cursor-pointer border-t ${
                                currentPage === number
                                    ? "text-main border-main"
                                    : "text-gray-600 border-transparent hover:border-main"
                            }`}
                        >
                            {number}
                        </p>
                    ))}
                </div>

                {/* Next Page */}
                <button
                    disabled={currentPage === pageCount}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="flex items-center pt-3 text-gray-600 hover:text-main cursor-pointer"
                >
                    <p className="text-sm font-medium leading-none mr-3">
                        Next
                    </p>
                    <svg
                        width={14}
                        height={8}
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.1665 4H12.8332"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9.5 7.33333L12.8333 4"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9.5 0.666687L12.8333 4.00002"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PaginationNavbar;
