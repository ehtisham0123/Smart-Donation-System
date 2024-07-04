
import React from 'react';

const Pagination = ({ neediesPerPage, totalNeedies, paginate ,currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNeedies / neediesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} 
           className={`page-item ${number == currentPage  ? "active" : ""}`} 
         
          >
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;