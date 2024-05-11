import React, { useState } from "react";
import { TabPanel } from "primereact/tabview";
import axios from "axios";
import { useDispatch } from "react-redux";
const ReviewManagementTab = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [page, setPage] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    allPage: 0,
    curPage: 0,
    startPage: null,
    endPage: null,
  });

  const fetchReviews = async (page) => {
    const exampleReviews = [
      { id: 1, content: "리뷰 1" },
      { id: 2, content: "리뷰 2" },
    ];
    const examplePageInfo = {
      allPage: 5,
      curPage: page,
      startPage: 1,
      endPage: 5,
    };

    setReviews(exampleReviews);
    setPageInfo(examplePageInfo);
  };

  useEffect(() => {
    fetchReviews(pageInfo.curPage);
  }, [pageInfo.curPage]);

  return (
    <div>
      <h3>내가 썼던 리뷰 불러오기</h3>
    </div>
  );
};
export default ReviewManagementTab;
