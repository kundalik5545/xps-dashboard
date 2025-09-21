// hooks/useSingleDelete.js
"use client";

import { useState } from "react";
import { toast } from "sonner"; // replace with your toast lib import if different

/**
 * useSingleDelete
 *
 * @param {Object} params
 * @param {(updater: Function) => void} params.setData  - state setter for your list (from useState)
 * @param {(id: any) => Promise<{ success: boolean, message?: string, data?: any }>} params.deleteAction - server action that deletes a single item by id
 * @param {(id: any) => void} [params.onSuccess] - optional callback executed after successful delete
 */

export function useSingleDelete({ setData, deleteAction } = {}) {
  const [loading, setLoading] = useState(false);

  const onDelete = async (id) => {
    if (!deleteAction) {
      console.error("useSingleDelete: deleteAction is required");
      return;
    }
    if (!setData) {
      console.error("useSingleDelete: setData is required");
      return;
    }

    setLoading(true);

    try {
      const res = await deleteAction(id);

      if (res && res.success) {
        // remove deleted id from state
        setData((prev) => prev.filter((item) => item.id !== id));
        toast.success("✅ Deleted successfully");
      } else {
        const msg = (res && res.message) || "Unknown error";
        toast.error(`❌ Failed to delete: ${msg}`);
      }
    } catch (error) {
      toast.error(`❌ Unexpected error: ${error?.message || String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return { onDelete, loading };
}

export default useSingleDelete;

// const onDelete = async (id) => {
//   try {
//     const res = await deletePortal(id);

//     if (res.success) {
//       const updatedData = data.filter((item) => item.id !== id);
//       setData(updatedData);
//       toast.success("✅ Deleted successfully");
//     } else {
//       toast.error("❌ Failed to delete: " + res.message);
//     }
//   } catch (error) {
//     console.error("⚠️ Unexpected error while deleting:", error);
//     return ApiRes(
//       false,
//       STATUS.INTERNAL_SERVER_ERROR,
//       `Unexpected error: ${error.message}`,
//       null
//     );
//   }
// };
