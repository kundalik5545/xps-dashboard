"use client";
import PageHeader from "@/components/myUis/PageHeader";
import React from "react";
import XpsDbTable from "./_components/XpsDbTable";
import { xpsDbTableColumns } from "./_components/xpsDbTableColumns";
import useFetchData from "@/hooks/useFetchData";
import { getAllXpsTables } from "@/actions/database/XpsTables";
import Loading from "@/app/Loading";

const pageTitle = "XPS Tables";
const pageDesc = "Manage XPS Tables in better way.";

const XpsTablesPage = () => {
  const {
    data: xpsTablesData,
    error: xpsTbError,
    isLoading: xpsTbLoading,
  } = useFetchData(getAllXpsTables);

  if (xpsTbLoading) return <Loading />;
  if (xpsTbError)
    return <div className="text-red-500">Error: {xpsTbError.message}</div>;

  return (
    <div>
      {/* Page Heading */}
      <PageHeader pageTitle={pageTitle} pageDesc={pageDesc} />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <XpsDbTable data={xpsTablesData?.data} columns={xpsDbTableColumns()} />
      </div>
    </div>
  );
};

export default XpsTablesPage;
