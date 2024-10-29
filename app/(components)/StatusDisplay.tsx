import React from "react";

function StatusDisplay({ status }: { status: string }) {
  function getColor(status: string) {
    let color = "bg-slate-700";
    switch (status.toLowerCase()) {
      case "done":
        color = "bg-green-200";
        break;
      case "started":
        color = "bg-yellow-200";
        break;
      case "not started":
        color = "bg-red-200";
        break;
      default:
        color = "bg-slate-700";
    }
    return color;
  }

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-stone-950 ${getColor(
        status
      )}`}
    >
      {status}
    </span>
  );
}

export default StatusDisplay;
