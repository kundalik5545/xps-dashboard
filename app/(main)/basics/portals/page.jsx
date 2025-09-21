"use client";
import {
  addUpdatePortal,
  deletePortal,
  getAllPortals,
  multiDeletePortals,
} from "@/actions/basics/portals";
import FormModal from "@/components/myUi/FormModal";
import PageHeader from "@/components/myUi/PageHeader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { portalColumns } from "./_components/PortalColumns";
import PortalForm from "./_components/PortalForm";
import PortalTable from "./_components/PortalTable";
import { useMultiDelete } from "@/hooks/useMultiDelete";
import useSingleDelete from "@/hooks/useSingleDelete";

//Page Header props
const pageTitle = "Portals Page";
const buttonText = "Add New Portal";
const pageDesc = "Manage your portals here.";

const page = () => {
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);

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

  const handleSubmit = async (formData) => {
    const actions = isEditing ? "update" : "add";

    const payload = isEditing ? { formData, id: editingData.id } : formData;

    const res = await addUpdatePortal({ payload, actions });

    if (!res.success) {
      toast.error(
        `❌ Failed to ${isEditing ? "update" : "add"} portal: ` + res.message
      );
    }

    if (res.success) {
      toast.success(
        `✅ Portal ${isEditing ? "updated" : "added"} successfully`
      );

      setIsDialogOpen(false);

      // Refresh the data
      const updatedData = isEditing
        ? data.map((item) => (item.id === res.data.id ? res.data : item))
        : [...data, res.data];

      setData(updatedData);
      setIsEditing(false);
      setEditingData(null);
    }
  };

  const onEdit = (record) => {
    setEditingData(record);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const { onDelete } = useSingleDelete({
    setData,
    deleteAction: deletePortal,
  });

  const { handleMultiDelete, loading } = useMultiDelete({
    multiDeleteFn: multiDeletePortals,
    setData,
  });

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
        onMultiRowDelete={handleMultiDelete}
        loading={loading}
      />

      {/* Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <PortalForm onFormSubmit={handleSubmit} editingData={editingData} />
        }
      />
    </div>
  );
};

export default page;
