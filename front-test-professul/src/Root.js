import React from "react";
import { useDispatch, useSelector } from "react-redux";
const RootLayout = ({ childeren }) => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  return (
    <>
      <main>{childeren}</main>
    </>
  );
};
export default RootLayout;
