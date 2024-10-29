import Link from "next/link";
import React from "react";
import { IoTicket, IoHome } from "react-icons/io5";
function Nav() {
  return (
    <nav className="flex justify-between p-4 bg-neutral-800">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <IoHome className="icon" />
        </Link>
        {/* <Link href="/TicketPage/new"> */}
        <Link href="/TicketPage">
          <IoTicket className="icon" />
        </Link>
      </div>
      <div>
        <p className="text-stone-100">Krish@gmail.com</p>
      </div>
    </nav>
  );
}

export default Nav;
