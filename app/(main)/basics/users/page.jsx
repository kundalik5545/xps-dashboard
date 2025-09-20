"use client";
import FormModal from "@/components/MyUi/FormModal";
import InputFilter from "@/components/MyUi/InputFilter";
import PageHeader from "@/components/MyUi/PageHeader";
import SelectFilter from "@/components/MyUi/SelectFilter";
import SelectFilters from "@/components/MyUi/SelectFilters";
import React, { useState } from "react";

//Page Header props
const pageTitle = "Users Page";
const buttonText = "Add New User";

const options = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

const page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <PageHeader
        pageTitle={pageTitle}
        buttonText={buttonText}
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Filters */}
      <InputFilter column={null} placeholder="Search Users..." />

      <SelectFilter
        column={null}
        placeholder="Filter by Role"
        options={options}
      />

      <SelectFilters
        column={null}
        placeholder="Filter by Role"
        options={options}
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
