"use client";
import {
  addUpdatePortal,
  deletePortal,
  getAllPortals,
  multiDeletePortals,
} from "@/actions/basics/portals";
import FormModal from "@/components/myUis/FormModal";
import PageHeader from "@/components/myUis/PageHeader";
import { useMultiDelete } from "@/hooks/useMultiDelete";
import useSingleDelete from "@/hooks/useSingleDelete";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { portalColumns } from "./_components/PortalColumns";
import PortalForm from "./_components/PortalForm";
import PortalTable from "./_components/PortalTable";

//Page Header props
const pageTitle = "Portals Page";
const buttonText = "Add New Portal";
const pageDesc = "Manage your portals here.";

const page = () => {
  // const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [portalData, setPortalData] = useState([]);

  useEffect(() => {
    const fetchPortals = async () => {
      const res = await getAllPortals();

      if (res.success) {
        setPortalData(res.data);
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
        ? portalData.map((item) => (item.id === res.data.id ? res.data : item))
        : [...portalData, res.data];

      setPortalData(updatedData);
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
    setPortalData,
    deleteAction: deletePortal,
  });

  const { handleMultiDelete, loading } = useMultiDelete({
    multiDeleteFn: multiDeletePortals,
    setPortalData,
  });

  return (
    <div>
      {/* Page Heading */}
      <PageHeader
        pageTitle={pageTitle}
        buttonText={buttonText}
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
        pageDesc={pageDesc}
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 overflow-x-auto rounded-md shadow-md mt-4 p-3">
        <PortalTable
          data={portalData}
          columns={portalColumns({ onEdit, onDelete })}
          onMultiRowDelete={handleMultiDelete}
          loading={loading}
        />
      </div>

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
