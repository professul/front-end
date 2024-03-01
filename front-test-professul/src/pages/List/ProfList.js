import React from "react";
import style from "./ProfList.module.css";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ProfList = () => {
  const searchList = [
    {
      이름: "김연수",
      학교: "서울대학교",
      '학과/학부': "경영학과",
      평점: 4.5,
      리뷰: "10개"
    },
    {
      이름: "홍길동",
      학교: "한양대학교",
      '학과/학부': "기계공학과",
      평점: 3.8,
      리뷰: "5개"
    }
  ];
  return (
    <div>
      <p className={style.center}>'ㅇㅇㅇ' 검색결과 00건</p>
      <div  className={`${style.listTable} ${style.marginCenter}`}>
      <DataTable value={searchList}>
        <Column field="이름" header="이름"></Column>
        <Column field="학교" header="학교"></Column>
        <Column field="학과/학부" header="학과/학부"></Column>
        <Column field="평점" header="평점"></Column>
        <Column field="리뷰" header="리뷰"></Column>
      </DataTable>
      </div>
    </div>
  );
};

export default ProfList;
