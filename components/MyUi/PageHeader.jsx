"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const PageHeader = ({
  pageTitle,
  pageDesc,
  buttonText,
  setIsDialogOpen,
  setIsEditing,
}) => {
  return (
    <div className="flex flex-col justify-between mb-6 mt-3">
      <div className="pageHeader__title flex items-center justify-between">
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
        {buttonText && (
          <Button
            variant={"default"}
            onClick={() => {
              setIsDialogOpen(true);
              setIsEditing(false);
            }}
          >
            <Plus /> {buttonText}
          </Button>
        )}
      </div>

      {pageDesc && <p className="mt-4">{pageDesc}</p>}
    </div>
  );
};

export default PageHeader;
