"use client";
import PageHeader from "@/components/myUis/PageHeader";
import React, { useEffect, useMemo, useState } from "react";
import XpsMenuTable from "./_components/XpsMenuTable";
import XpsMenuColumns from "./_components/XpsMenuColumns";
import { getAllXpsMenus } from "@/actions/xps/xpsMenu";

const pageTitle = "XPS Menu";
const pageDesc = "Manage XPS Menu in better way.";

const XpsMenuPage = () => {
  const [data, setData] = useState([]);
  const columns = useMemo(() => XpsMenuColumns(), []);

  useEffect(() => {
    const fetchPortals = async () => {
      const res = await getAllXpsMenus();

      if (res.success) {
        setData(res.data);
      }
    };

    fetchPortals();
    return () => {};
  }, []);

  return (
    <div>
      {/* Page Heading */}
      <PageHeader pageTitle={pageTitle} pageDesc={pageDesc} />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 overflow-x-auto rounded-md shadow-md mt-4 p-3">
        <XpsMenuTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default XpsMenuPage;
