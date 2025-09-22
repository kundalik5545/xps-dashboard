"use client";
import { InputFilter, SelectFilter } from "@/components/myUis/FilterComponents";
import FormModal from "@/components/myUis/FormModal";
import PageHeader from "@/components/myUis/PageHeader";
import { useEffect, useState } from "react";
import UserForm from "./_components/UserForm";
import {
  addUpdateUser,
  deleteMultipleUsers,
  deleteUserById,
  getAllUsers,
} from "@/actions/basics/users";
import UserTable from "./_components/UserTable";
import { userColumns } from "./_components/UserColumns";
import { useMultiDelete } from "@/hooks/useMultiDelete";
import useSingleDelete from "@/hooks/useSingleDelete";
import { toast } from "sonner";
import UserForm2 from "./_components/UserForm2";

//Page Header props data
const pageTitle = "Users Page";
const buttonText = "Add New User";
const pageDesc = "Manage your portals here.";

const page = () => {
  const [data, setData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();

      if (res.success) {
        setData(res.data);
      }
    };

    fetchUsers();
    return () => {};
  }, []);

  const handleSubmit = async (formData) => {
    const actions = isEditing ? "update" : "add";

    const payload = isEditing ? { formData, id: editingData.id } : formData;

    const res = await addUpdateUser({ payload, actions });

    if (!res.success) {
      toast.error(
        `❌ Failed to ${isEditing ? "update" : "add"} user: ` + res.message
      );
    }

    if (res.success) {
      toast.success(`✅ User ${isEditing ? "updated" : "added"} successfully`);

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
    deleteAction: deleteUserById,
  });

  const { handleMultiDelete, loading } = useMultiDelete({
    multiDeleteFn: deleteMultipleUsers,
    setData,
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
      <UserTable
        data={data}
        columns={userColumns({ onEdit, onDelete })}
        onMultiRowDelete={handleMultiDelete}
        loading={loading}
      />

      {/* Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <UserForm2 onFormSubmit={handleSubmit} editingData={editingData} />
        }
      />
    </div>
  );
};

export default page;
