import React from 'react';
import './../Slide.css';
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Item from '../Item/Item';
import { useData } from '../../../../DataContext';




function SearchResult() {
  const ResultsPerPage = 6;
  const { data} = useData();
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Tính số trang dựa vào số lượng kết quả và số kết quả trên mỗi trang
  const totalPages = Math.ceil(data.length / ResultsPerPage);
  // Lấy chỉ mục của kết quả cần hiển thị trên trang hiện tại
  const startIndexPage = (currentPage - 1) * ResultsPerPage;
  const endIndexPage = startIndexPage + ResultsPerPage;
  const currentResults = data.slice(startIndexPage, endIndexPage);

  // Hàm xử lý chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Hien thi
  const renderPageNumber = (numberpage: number) => {
    switch (numberpage) {
      case 1:
      case 2: 
      case 3:
        return <div className='page'>
          {Array.from({ length: numberpage }, (_, index) => index + 1).map((page) => (
            <button className='btn-page' key={page} onClick={() => handlePageChange(page)}>
              {page}
            </button>
          ))}
        </div>
      default:
        return <div className='page'>
          {currentPage >= 0 && <button className='btn-page' onClick={() => setCurrentPage(currentPage - 1)}>{'<'}</button>}
          <button className='btn-page'>{currentPage}</button>
          {currentPage < totalPages &&
            <div>
              <button className='btn-page' onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button>
              <button className='btn-page'>...</button>
              <button className='btn-page'>{totalPages}</button>
              <button className='btn-page' onClick={() => setCurrentPage(currentPage + 1)}>{'>'}</button>
            </div>
          }


        </div>
    }
  };
  return (
    <div>
      <div className='component1'>
        <p className='tittle-item'>Search Result</p>
        <div className='all-item'>
          <div className='item-three'>
            {data.length === 0 ? (
              <p className='p-noresultsearch'>Khong co ket qua</p>
            ) : (
              currentResults.map((item) => (
                <div className='item-one'>
                  <Item {...item} key={item.id} />
                </div>
              ))
            )}
          </div>
        </div>
        <div>{renderPageNumber(totalPages)}</div>
      </div>
    </div>

  );
}

export default SearchResult;

