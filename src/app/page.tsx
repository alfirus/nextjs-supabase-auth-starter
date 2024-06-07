"use client";
import { useAuthStore } from "@/utils/zustand";
import React from "react";

const Home = () => {
  const { user } = useAuthStore();
  return <div>{user.id}</div>;
};

export default Home;
