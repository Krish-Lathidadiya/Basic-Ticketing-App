import React from "react";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";
import { TicketData } from "@/app/types/types";
import { format } from "date-fns";
import Link from "next/link";

function TicketCard({ ticket }: { ticket: TicketData }) {
  return (
    <div className="flex flex-col bg-neutral-500 hover:bg-neutral-800 rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>
      <Link href={`/TicketPage/${ticket._id}`} style={{display:"contents"}}>
    
        <h4>{ticket.title}</h4>
        <hr className="h-px border-0 bg-stone-600 mb-2" />
        <p className="whitespace-pre-wrap">{ticket.description}</p>
        <div className="flex-grow"></div>
        <div className="flex mt-2 ">
          <div className="flex flex-col ">
            <p className="text-xs my-1">
              {format(new Date(ticket.createdAt), "yyyy-MM-dd HH:mm:ss")}
            </p>
            <ProgressDisplay progress={ticket.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <StatusDisplay status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TicketCard;
