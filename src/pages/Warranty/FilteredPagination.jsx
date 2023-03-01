import React, { useState, useEffect } from "react";



const FilteredPagination = ({itemsPerPage }) => {
    const data = [
  "item 1",
  "item 2",
  "item 3",
  "item 4",
  "item 5",
  "item 6",
  "item 7",
  "item 8",
  "item 9",
  "item 10",
  "item 11",
  "item 12",
  "item 13",
  "item 14",
  "item 15",
  "item 16",
  "item 17",
  "item 18",
  "item 19",
  "item 20",
];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    setTotalPages(totalPages);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayData = data.slice(startIndex, endIndex);
    setDisplayData(displayData);
  }, [currentPage, data, itemsPerPage]);

  const handlePrevClick = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  return (
    <div>
      <ul>
        {displayData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        Prev
      </button>
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};


export default FilteredPagination;
