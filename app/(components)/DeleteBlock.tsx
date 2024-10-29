"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { MdDelete } from "react-icons/md";

function DeleteBlock({ id }: { id: string }) {
  const router = useRouter();

  const deleteTicket = async () => {
    if (!id) {
      console.error("No ID provided for deletion");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/Tickets/${id}`
      );
      console.log(response.data.message);
      router.refresh();
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <MdDelete
      className="text-red-500 hover:cursor-pointer hover:text-red-400"
      onClick={deleteTicket}
    />
  );
}

export default DeleteBlock;
