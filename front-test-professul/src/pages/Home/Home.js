import React from "react";
import style from "./Home.module.css";

import "primeicons/primeicons.css";
import { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css

const options = [
  { label: "학교", value: "학교" },
  { label: "교수", value: "교수" },
];

const Home = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  return (
    <>
      <section>
        <div className={style["main-first"]}>
          <div className={style["logo"]}>PROFESSUL</div>
          <br />
          <br />
          <div className={style["explain"]}>
            <span className={`${style.bold} ${style.keyword}`}>학교</span> 또는{" "}
            <span className={`${style.bold} ${style.keyword}`}>교수</span>를
            검색해보세요
          </div>
          <br />
          <br />

          <div className={style["searchbar"]}>
            <select
              name="type"
              value={selectedOption}
              onChange={handleSelectChange}
              className={style["custom-select"]}
            >
              <option value="">구분</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={handleSearchChange}
              className={style["custom-input"]}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
