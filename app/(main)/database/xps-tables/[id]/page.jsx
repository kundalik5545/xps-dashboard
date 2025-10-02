"use client";
import { getAllTbColumnsById } from "@/actions/database/XpsTables";
import PageHeader from "@/components/myUis/PageHeader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ColumnsTable from "./_components/page";

const pageTitle = "PenScope Columns";
const pageDesc = "This page displays the columns of the PenScope tables.";

const page = () => {
  const params = useParams();
  const tableId = params.id;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      setLoading(true);
      const res = await getAllTbColumnsById(Number(tableId));
      if (res.success) {
        setTableData(res?.data?.columns);
      }
      setLoading(false);
    };

    fetchTableData();
  }, [tableId]);

  return (
    <div>
      {/* Page Heading */}
      <PageHeader pageTitle={pageTitle} pageDesc={pageDesc} />

      {/* Table */}
      <div className="pr-3">
        {loading ? "Loading..." : <ColumnsTable tableData={tableData} />}
      </div>
    </div>
  );
};

export default page;
