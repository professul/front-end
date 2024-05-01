import React from "react";
import { useDispatch, useSelector } from "react-redux";
const RootLayout = ({ children }) => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  return (
    <>
      <main>{children}</main>
    </>
  );
};
export default RootLayout;
