import React, { useState } from 'react';
import style from "./Rate.module.css";
import StarRatings from 'react-star-ratings';

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css

import { SelectButton } from 'primereact/selectbutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const professor = [
  { label: '김연수', value: '김연수' },
  { label: '김지수', value: '김지수' },
  { label: '유경미', value: '유경미' },
  { label: '이주현', value: '이주현' },
  { label: '임예영', value: '임예영' },
  { label: '직접입력', value: '직접입력' }
];
const levelOptions = [
  { label: '매우 쉬움', value: '매우 쉬움' },
  { label: '쉬움', value: '쉬움' },
  { label: '보통', value: '보통' },
  { label: '어려움', value: '어려움' },
  { label: '매우 어려움', value: '매우 어려움' }
];

const groupOptions = [
  { label: '매우 적음', value: '매우 적음' },
  { label: '적음', value: '적음' },
  { label: '보통', value: '보통' },
  { label: '많음', value: '많음' },
  { label: '매우 많음', value: '매우 많음' }
];

const planOptions = [
  { label: '불일치', value: '불일치' },
  { label: '보통', value: '보통' },
  { label: '일치', value: '일치' },
];

const Rate = () => {
  const [profValue, setProfValue] = useState(professor[0]); // 교수 이름 선택
  const [levelValue, setLevelValue] = useState(null); // 수업 난이도 선택 상태
  const [groupValue, setGroupValue] = useState(null); // 조별과제 선택 상태
  const [planValue, setPlanValue] = useState(null); // 강의계획서 선택 상태


  const handleLevelChange = (e) => {
    setLevelValue(e.value); // 수업 난이도 선택한 값 업데이트
  };

  const handleGroupChange = (e) => {
    setGroupValue(e.value); // 조별과제 선택한 값 업데이트
  };

  const handlePlanChange = (e) => {
    setPlanValue(e.value); // 강의계획서 선택한 값 업데이트
  };

  const handleProfChange = (e) => {
    setProfValue(e.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.qArea}>
        <label htmlFor="profName" className={style.question}>교수명</label>
        <select
          name="profName"
          value={profValue}
          onChange={handleProfChange}
          className={style.selectProf}
        >
        <option value="">--교수명--</option>
        {professor.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>
        <small id="profName-help">
          찾는 교수가 없는 경우, 직접 입력하세요.
        </small>
      </div>

      <div className={style.qArea}>
        <label htmlFor="level" className={style.question}>수업 난이도</label>
        <SelectButton value={levelValue} options={levelOptions} onChange={handleLevelChange} />
      </div>

      <div className={style.qArea}>
        <label htmlFor="group" className={style.question}>조별과제 비중</label>
        <SelectButton value={groupValue} options={groupOptions} onChange={handleGroupChange} />
      </div>

      <div className={style.qArea}>
        <label htmlFor="plan" className={style.question}>강의 계획서 일치 여부</label>
        <SelectButton value={planValue} options={planOptions} onChange={handlePlanChange} />
      </div>

      <div className={style.qArea}>
        <label htmlFor="class" className={style.question}>수업 평점</label>
        <StarRatings
          name="classRate"
          starCount={5} // 전체 별의 개수
        />
      </div>

      <div className={style.qArea}>
        <label htmlFor="prof" className={style.question}>교수 평점</label>
        <StarRatings
          name="classRate"
          starCount={5} // 전체 별의 개수
        />
      </div>
      
      <div className={style.qArea}>
        <label htmlFor="group" className={style.question}>한줄평</label>
        <InputTextarea className={style.reviewBox}/>
      </div>

      <Button label="후기 등록" rounded className={style.submit}/>

    </div>
  );
};

export default Rate;
