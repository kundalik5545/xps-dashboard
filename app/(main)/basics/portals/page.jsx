"use client";
import FormModal from "@/components/MyUi/FormModal";
import PageHeader from "@/components/MyUi/PageHeader";
import { useEffect, useState } from "react";
import { portalColumns } from "./_components/PortalColumns";
import PortalTable from "./_components/PortalTable";
import { deletePortal, getAllPortals } from "@/actions/basics/portals";
import { toast } from "sonner";

//Page Header props
const pageTitle = "Portals Page";
const buttonText = "Add New Portal";
const pageDesc = "Manage your portals here.";

const page = () => {
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPortals = async () => {
      const res = await getAllPortals();

      if (res.success) {
        setData(res.data);
      }
    };

    fetchPortals();
    return () => {};
  }, []);

  const onEdit = (record) => {
    setIsEditing(record);
    setIsDialogOpen(true);
  };

  const onDelete = async (id) => {
    try {
      const res = await deletePortal(id);

      if (res.success) {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        toast.success("✅ Deleted successfully");
      } else {
        toast.error("❌ Failed to delete: " + res.message);
      }
    } catch (error) {
      console.error("⚠️ Unexpected error while deleting:", error);
      return ApiRes(
        false,
        STATUS.INTERNAL_SERVER_ERROR,
        `Unexpected error: ${error.message}`,
        null
      );
    }
  };

  return (
    <div className="">
      {/* Page Heading */}
      <PageHeader
        pageTitle={pageTitle}
        buttonText={buttonText}
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
        pageDesc={pageDesc}
      />

      {/* Table */}
      <PortalTable
        data={data}
        columns={portalColumns({ onEdit, onDelete })}
        onEdit={() => {}}
        onDelete={() => {}}
        onMultiRowDelete={() => {}}
      />

      {/* Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={<div>My Form Content</div>}
      />
    </div>
  );
};

export default page;
