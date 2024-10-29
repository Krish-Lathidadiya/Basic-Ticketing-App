import React from 'react';
import { FaFire } from "react-icons/fa";

function PriorityDisplay({ priority }: { priority: number }) {
  return (
    <div className='flex justify-start align-baseline'>
      {Array.from({ length: priority }, (_, index) => (
        <FaFire key={index} className='text-red-400' />
      ))}
    </div>
  );
}

export default PriorityDisplay;
