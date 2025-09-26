import PageHeader from "@/components/myUis/PageHeader";
import React from "react";

const pageTitle = "Daily Task Comments";
const buttonText = "Add Task";

const DailyTaskCommentPage = () => {
  return (
    <div>
      <PageHeader pageTitle={pageTitle} buttonText={buttonText} />
    </div>
  );
};

export default DailyTaskCommentPage;
