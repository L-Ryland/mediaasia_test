import { useInfiniteQuery } from "react-query";
import { FetchData } from "../interface";
import { Link, Route, Routes } from "react-router-dom";
import { PhotoDetail } from "./PhotoDetail";
import { fetchInfinitePhotos } from "../requests";
import React, {useMemo, useRef, useState} from "react";
import "./Photo.css";

const Pagination: React.FC<{
  page: number;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  fetchSpecifiedPage: (param: number) => void
  disabled: {isFetching: boolean}
}> = ({ page, fetchPreviousPage, fetchNextPage, fetchSpecifiedPage,disabled}) => {
  const [specifedPage, setSpecifiedPage] = useState<number>(page);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < 51;
  const {isFetching} = disabled;
  const inputRef = useRef(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputRef.current) {
      console.log('[input ref]', inputRef.current, specifedPage);
      fetchSpecifiedPage(specifedPage);
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.target.value);
    if (!isNaN(inputValue)) setSpecifiedPage(inputValue);
  }
  return (
    <div className="pagination">
      <button onClick={fetchPreviousPage} disabled={!hasPreviousPage || isFetching}>«</button>
      <input onKeyDown={handleKeyDown} value={page} ref={inputRef} onChange={handleChange}/>
      <button onClick={fetchNextPage} disabled={!hasNextPage || isFetching}>»</button>
    </div>
  );
};
export const Photos = () => {
  // const {data, isLoading} = useQuery(FetchData.FetchPhotos, () => fetchPhotos());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: infinitePhotos,
    refetch,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
  } = useInfiniteQuery(
    [FetchData.FetchPhotos],
    ({ pageParam = currentPage }) => fetchInfinitePhotos({ pageParam }),
    {
      // getPreviousPageParam: firstPage => currentPage - 1,
      getNextPageParam: lastPage => currentPage + 1,
    }
  );
  const handlePreviousPage = async () => {
    // await fetchPreviousPage();
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = async () => {
    if (infinitePhotos?.pageParams.includes(currentPage + 1)) {}
    else await fetchNextPage();
    setCurrentPage(currentPage + 1);
  };
  const handleSpecifiedPage = async (specifiedPage: number) => {
    if (specifiedPage < 1 || specifiedPage > 50) alert("The pages only range from 1 to 50, please specify another page!!");
    await refetch({refetchPage: (page, index) => index === specifiedPage - 1})
    setCurrentPage(specifiedPage);
  }
  const currentPageData = useMemo(() => infinitePhotos?.pages[currentPage - 1]?.data, [currentPage, infinitePhotos?.pages])
  console.log(
    "[Photo component] [infinitePhotos]",
    infinitePhotos,
    infinitePhotos?.pageParams
  );
  return (
    <div className="detailOuter">
      {
        !(
          !isFetchingPreviousPage &&
          !isFetchingNextPage &&
          !(isLoading && <p>Loading Photos</p>)
        )
      }
      {infinitePhotos && currentPageData && (
        <div className="index">
          {currentPageData.map((photo) => (
            <Link className="linkFont" key={photo.id} to={photo.id.toString()}>
              <p>
                {photo.id} - {photo.title}
              </p>
            </Link>
          ))}
        </div>
      )}
      <div className="detail">
        <Routes>
          <Route path=":photoId" element={<PhotoDetail />} />
        </Routes>
      </div>
      <Pagination
        page={currentPage}
        fetchNextPage={handleNextPage}
        fetchPreviousPage={handlePreviousPage}
        fetchSpecifiedPage={handleSpecifiedPage}
        disabled={{ isFetching: isFetchingNextPage || isFetchingPreviousPage }}
      />
    </div>
  );
};