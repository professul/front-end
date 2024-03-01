import React from "react";
import style from "./ReviewContent.module.css";
import StarRatings from 'react-star-ratings';

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css

import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Divider } from 'primereact/divider';
import { Rating } from 'primereact/rating';


const Review = () => {
  const professor = [
    {
      name: "김연수",
      univName: "서울대학교",
      deptName: "경영학과",
      rating: 4.5,
      reviewCount: "10"
    }
  ];

  // 차트 데이터 설정
  const chartData = {
    labels: ['난이도', '조별과제'],
    datasets: [
      {
        label: '점수',
        backgroundColor: '#375d78',
        data: [7.8, 3.2]
      }
    ]
  };

  // 차트 옵션 설정
  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <div className={style.container}>
      <div className={style.flex1}>
        <div className={style.profName}>
            {professor[0].name}
        </div>
        <div>
            <strong>{professor[0].univName}</strong>
        </div>
        <div>
            {professor[0].deptName}
        </div>
        <div>
          <Button label="후기작성" rounded className={style.button1}/>
          <Button label="비교하기" rounded className={style.button2}/>
        </div>
      </div>
      <Divider layout="vertical" />
      <div className={style.flex1}>
          <div>
              <label><strong>리뷰</strong></label>
              <br/>
              <div className={style.textRight}>
                <span className={style.border}>{professor[0].reviewCount}</span>개
              </div>
          </div>
          <Divider />
          <div>
              <label><strong>평점</strong></label>
              <div className={style.textRight}>
                <span className={style.border}>{professor[0].rating}</span>
                <br/>
                <StarRatings
                  rating={4.5} // 소수점 단위의 평점 값
                  starRatedColor="#ffc13e"
                  numberOfStars={5} // 총 별의 개수
                  starDimension="15px" // 별의 크기
                  starSpacing="1px" // 별 사이의 간격
                />
              </div>
          </div>
      </div>
      <Divider layout="vertical" />
      <div className={style.flex1}>
          <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Review;