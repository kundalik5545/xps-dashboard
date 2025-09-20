"use client";
import FormModal from "@/components/MyUi/FormModal";
import PageHeader from "@/components/MyUi/PageHeader";
import React, { useState } from "react";
import PortalFilter from "./_components/PortalFilter";

//Page Header props
const pageTitle = "Portals Page";
const buttonText = "Add New Portal";
const pageDesc = "Manage your portals here.";

const page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
