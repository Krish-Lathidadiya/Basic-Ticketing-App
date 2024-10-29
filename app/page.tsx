import React from "react";
import TicketCard from "./(components)/TicketCard";
import axios from "axios";
import { TicketData } from "@/app/types/types";

// Fetch tickets data
const getTickets = async (): Promise<{ tickets: TicketData[] } | undefined> => {
  try {
    const response = await axios.get<{ tickets: TicketData[] }>(
      "http://localhost:3000/api/Tickets"
    );
    return response.data;
  } catch (error) {
    console.log("Failed to get tickets", error);
    return undefined;

  }
};

async function Dashboard() {
  const data = await getTickets();
  const tickets: TicketData[] = data?.tickets || [];

  const uniqueCategories = [
    ...new Set(tickets.map(({ category }) => category)),
  ];

  console.log(uniqueCategories);

  return (
    <div className="p-5">
      <div>
        {uniqueCategories.map((uniqueCategory, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-semibold">{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4 gap-4">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, _index) => (
                  <TicketCard key={_index} ticket={filteredTicket} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
