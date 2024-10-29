"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { TicketData } from "../types/types";

function TicketForm({ ticket }: { ticket?: TicketData }) {
  const startingTicketData = ticket
    ? {
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        progress: ticket.progress,
        status: ticket.status,
        category: ticket.category,
      }
    : {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not started",
        category: "Hardware Problem",
      };

  const [formData, setFormData] = useState(startingTicketData);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "priority" || name === "progress" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (ticket) {
        // If ticket exists, update it
        await handleUpdate(ticket._id);
      } else {
        // If ticket does not exist, create a new one
        const response = await axios.post("/api/Tickets", { formData });
        console.log(response);
      }
      router.push("/");
    } catch (error) {
      setError(
        ticket
          ? "Error updating the form. Please try again."
          : "Error submitting the form. Please try again."
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/Tickets/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update Response:", response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          "Error updating the form: " +
            (error.response?.data.message || "Unknown error.")
        );
        console.error("Update Error:", error.response?.data);
      } else {
        setError("Error updating the form. Please try again.");
        console.error("Unexpected Error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Update formData when ticket changes
    if (ticket) {
      setFormData({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        progress: ticket.progress,
        status: ticket.status,
        category: ticket.category,
      });
    }
  }, [ticket]);

  return (
    <div className="flex justify-center ">
      <form className="flex flex-col gap-3 w-1/2 " onSubmit={handleSubmit}>
        <h3>{ticket ? "Edit Ticket" : "Create Ticket"}</h3>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          required
          value={formData.title}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows={5}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project</option>
        </select>

        <label>Priority</label>
        <div>
          {[1, 2, 3, 4, 5].map((priority) => (
            <div key={priority}>
              <input
                id={`priority-${priority}`}
                type="radio"
                name="priority"
                onChange={handleChange}
                value={priority}
                checked={formData.priority === priority}
              />
              <label htmlFor={`priority-${priority}`}>{priority}</label>
            </div>
          ))}
        </div>

        <label htmlFor="progress">Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min={0}
          max={100}
          onChange={handleChange}
        />

        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <input
          type="submit"
          className="btn"
          value={ticket ? "Save" : "Create Ticket"}
          disabled={isLoading}
        />
        {isLoading && <p>Submitting...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default TicketForm;
