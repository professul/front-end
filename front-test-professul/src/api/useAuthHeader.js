import React from "react";
import { useSelector } from "react-redux";

export default function useAuthHeader() {
  const accessToken = useSelector((state) => state.user.accessToken);

  return (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  };
}
