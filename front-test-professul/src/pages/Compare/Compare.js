import React from 'react';
import style from "./Compare.module.css";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css

import { Divider } from 'primereact/divider';
import { Chart } from 'primereact/chart';

const ProfList = [
  {
    이름: "김연수",
    학교: "서울대학교",
    '학과/학부': "경영학과",
    평점: 4.5,
    리뷰: "10"
  }
];

// 차트 데이터 설정
const chartData = {
  labels: ['일치', '불일치', '보통'],
  datasets: [
    {
      data: [20, 50, 30], // 각 데이터 값
      backgroundColor: ['#A9CB83', '#C16860', '#D1D1D1'], // 각 항목의 색상 설정
    },
  ],
};

// 차트 옵션 설정
const chartOptions = {
  maintainAspectRatio: false, // 차트 비율을 유지하지 않음
  legend: {
    display: false // 범례 표시 여부
  },
  title: {
    display: false // 차트 제목 표시 여부
  },
  // 레이블에 관련된 옵션 설정
  plugins: {
    legend: {
      display: false
    }
  }
};


const Compare = () => {

  return (
    <div className={style.container}>
      <div className={style.substance}>
        <div className={style.content}>
          <div className={style.title}>
            {ProfList[0].이름}<br/>
            <span className={style.univ}>{ProfList[0].학교}</span>
            <span className={style.dept}>{ProfList[0]['학과/학부']}</span>
          </div>
          <div><span className={style.result}>{ProfList[0].평점}</span>점</div>
        </div>
        <div className={style.content}>
          <div className={style.title}>리뷰</div>
          <div><span className={style.result}>{ProfList[0].리뷰}</span>개</div>
        </div>
        <div className={style.content}>
          <div className={style.title}>수업난이도</div>
          <div className={style.result}>어려움</div>
        </div>
        <div className={style.content}>
          <div className={style.title}>조별과제</div>
          <div className={style.result}>매우 많음</div>
        </div>
        <div className={style.content}>
          <span className={style.title}>강의 계획서</span>
          <div><Chart type="doughnut" data={chartData} options={chartOptions} className={style.chart} readOnly /></div>
        </div>
      </div>

      <Divider layout="vertical"/>

      <div className={style.substance}> 
        비교 교수 검색하기
      </div>
    </div>
  );
};

export default Compare;