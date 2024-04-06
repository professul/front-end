import React, { useState, useEffect } from "react";
import style from "./ProfList.module.css";
import axios from 'axios';

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ProfList = () => {
  const baseUrl = "http://localhost:8080";
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await axios.get(baseUrl + '/review/list');
      setProfessors(response.data);
    } catch (error) {
      console.error("교수 목록을 가져오는 데 실패했습니다.", error);
    }
  };

  return (
    <div>
      <p className={style.center}>{`검색결과 ${professors.length}건`}</p>
      <div className={`${style.listTable} ${style.marginCenter}`}>
        <DataTable value={professors}>
          <Column field="profName" header="이름"></Column>
          <Column field="univName" header="학교"></Column>
          <Column field="deptName" header="학과/학부"></Column>
          <Column field="rating" header="평점"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default ProfList;
