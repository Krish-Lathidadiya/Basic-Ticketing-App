import dbConnect from "@/app/lib/mongodb";
import Ticket from "../../(models)/Ticket";
import { NextResponse } from "next/server";
import {TicketData} from "@/app/types/types"

export async function POST(req: Request) {
  try {
   
    await dbConnect(); 
    console.log("Connected to MongoDB");

    const body = await req.json();
    const ticketData: TicketData = body.formData;

    // Validate required fields
    if (!ticketData.title || !ticketData.description) {
      return NextResponse.json(
        { message: "Title and Description are required." },
        { status: 400 }
      );
    }

    // Create the ticket in the database
    await Ticket.create(ticketData);
    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);

    // Check for specific error types
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { message: error.message }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(){
  try {
    const tickets=await Ticket.find({});
    return NextResponse.json({tickets},{status: 200});
  } catch (error) {
    return NextResponse.json({message:"error",error},{status: 500});
  }
}