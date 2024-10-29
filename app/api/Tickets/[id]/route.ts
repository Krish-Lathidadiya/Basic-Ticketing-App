import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Delete route called");
    console.log(params);
    const { id } = params;
    await Ticket.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Ticket deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { ticket, message: "Ticket details retrieved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving ticket:", error);
    return NextResponse.json(
      { message: "Error retrieving ticket", error },
      { status: 500 }
    );
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    console.log("Received data:", data)

    const ticket = await Ticket.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Ticket updated successfully", ticket },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating ticket:", error);
      return NextResponse.json(
        { message: "Error updating ticket", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unexpected error updating ticket:", error);
      return NextResponse.json(
        { message: "Unexpected error updating ticket" },
        { status: 500 }
      );
    }
  }
}
