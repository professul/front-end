import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TabPanel } from "primereact/tabview";
import axios from "axios";
import { useDispatch } from "react-redux";
const ReviewManagementTab = () => {
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);
  // const reviews = useSelector((state) => state.review.reviews);

  // const [page, setPage] = useState([]);
  // const [pageInfo, setPageInfo] = useState({
  //   allPage: 0,
  //   curPage: 0,
  //   startPage: null,
  //   endPage: null,
  // });

  // useEffect(() => {
  //   // 리뷰를 가져오는 비동기 액션을 dispatch 합니다.
  //   dispatch(fetchReviews(pageInfo.curPage));
  // }, [dispatch, pageInfo.curPage]);

  // useEffect(() => {
  //   fetchReviews(pageInfo.curPage);
  // }, [pageInfo.curPage]);

  return (
    <div>
      <h3>내가 썼던 리뷰 불러오기</h3>
    </div>
  );
};
export default ReviewManagementTab;
