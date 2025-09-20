"use client";
import FormModal from "@/components/MyUi/FormModal";
import PageHeader from "@/components/MyUi/PageHeader";
import { useState } from "react";
import { portalColumns } from "./_components/PortalColumns";
import PortalTable from "./_components/PortalTable";

//Page Header props
const pageTitle = "Portals Page";
const buttonText = "Add New Portal";
const pageDesc = "Manage your portals here.";

const page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = (record) => {
    setIsEditing(record);
    setIsDialogOpen(true);
  };

  const onDelete = (id) => {
    console.log("Delete record with id: ", id);
  };

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

const data = [
  {
    portalName: "Portal 1",
    appName: "App 1",
  },
  {
    portalName: "Portal 2",
    appName: "App 2",
  },
  {
    portalName: "Portal 3",
    appName: "App 3",
  },
];
