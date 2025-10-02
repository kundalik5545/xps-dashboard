"use client";
import PageHeader from "@/components/myUis/PageHeader";
import React, { useEffect, useMemo, useState } from "react";
import EmMenuTable from "./_components/EmMenuTable";
import EmMenuColumns from "./_components/EmMenuColumns";
import { getAllEmMenus } from "@/actions/emember/emMenus";

const pageTitle = "eMember Menu";
const pageDesc = "Manage eMember Menu";

const EmMenuPage = () => {
  const [data, setData] = useState([]);
  const columns = useMemo(() => EmMenuColumns(), []);

  useEffect(() => {
    const fetchMenus = async () => {
      const res = await getAllEmMenus();

      if (res.success) {
        setData(res.data);
      }
    };

    fetchMenus();
    return () => {};
  }, []);

  return (
    <div>
      {/* Page Heading */}
      <PageHeader pageTitle={pageTitle} pageDesc={pageDesc} />

      {/* Table */}
      <div className="overflow-x-auto rounded-md shadow-md mt-4 p-3 grid grid-cols-1 gap-4">
        <EmMenuTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default EmMenuPage;
