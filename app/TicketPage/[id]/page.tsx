import TicketForm from "@/app/(components)/TicketForm";
import { TicketData } from "@/app/types/types";
import axios from "axios";
import { promises } from "dns";
import React from "react";

const getTicket = async (
  id: string
): Promise<{ ticket: TicketData } | undefined> => {
  try {
    const response = await axios.get<{ ticket: TicketData }>(
      `http://localhost:3000/api/Tickets/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Get Ticket Error", error);
    return undefined;
  }
};
async function TicketPage({ params }: { params: { id: string } }) {
  const data = await getTicket(params.id);
  const ticket: TicketData | null = data?.ticket || null;
  return (
    <div>
      {ticket ? <TicketForm ticket={ticket} /> : <p>Ticket not found.</p>}
    </div>
  );
}

export default TicketPage;
