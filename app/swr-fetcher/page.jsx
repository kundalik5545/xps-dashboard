"use client";
import { fetcher } from "@/hooks/fetcher";
import React from "react";
import useSWR from "swr";

const SwrFetcherPage = () => {
  const { data, error, isLoading } = useSWR(`/api/health`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return <div>hello {data.name}!</div>;
};

export default SwrFetcherPage;
