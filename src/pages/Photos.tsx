import { useInfiniteQuery } from "react-query";
import {FetchData, Photo} from "../interface";
import { Link, Route, Routes } from "react-router-dom";
import { PhotoDetail } from "./PhotoDetail";
import { fetchInfinitePhotos } from "../requests";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Photo.css";

const Pagination: React.FC<{
  page: number;
  jumpToPage: (param: number) => void;
  disabled: { isFetching: boolean };
}> = ({
  page,
  jumpToPage,
  disabled,
}) => {
  const hasPreviousPage = page > 1;
  const hasNextPage = page < 51;
  const { isFetching } = disabled;
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.defaultValue = page.toString();
  }, [page]);
  return (
    <div className="pagination">
      <button
        onClick={() => jumpToPage(page - 1)}
        disabled={!hasPreviousPage || isFetching}
      >
        «
      </button>
      {/*<input ref={inputRef} onChange={handleChange} onKeyDown={handleKeyDown} />*/}
      <button disabled>{page}</button>
      <button
        onClick={() => jumpToPage(page + 1)}
        disabled={!hasNextPage || isFetching}
      >
        »
      </button>
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
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
  } = useInfiniteQuery(
    [FetchData.FetchPhotos, 'infinite'],
    ({ pageParam = 1 }) => fetchInfinitePhotos({ pageParam }),
    {
      // getPreviousPageParam: firstPage => currentPage - 1,
      getNextPageParam: (lastPage) => currentPage + 1,
    }
  );
  const jumpToPage = async (specifiedPage: number) => {
    console.log("[Photo][JumpToPage] pageParam - ",  infinitePhotos?.pageParams, "specifiedPage - ", specifiedPage)
    if (!infinitePhotos) return;
    if (
      !infinitePhotos.pageParams.includes(specifiedPage) &&
      specifiedPage !== 1
    )
      await fetchNextPage()
    setCurrentPage(specifiedPage);
  };
  // console.log('[currentPage]', currentPage, "[page[currentPage]", infinitePhotos?.pages[currentPage - 1])
  const currentPageData = infinitePhotos?.pages[currentPage - 1].data;
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
          {currentPageData?.map((photo) => (
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
        jumpToPage={jumpToPage}
        disabled={{ isFetching: isFetchingNextPage || isFetchingPreviousPage }}
      />
    </div>
  );
};