import React from 'react'
interface CalenderItemProps{
    title:string;
    day:string;
    hour:number|string;
}
function CalenderItem({title,day,hour}:CalenderItemProps) {
  return (
    <div className='w-full border-r-4 mb-4 pt-4px pr-12px pb-4px pl-70px border-[#006C49]'>
      <div className='flex flex-col pr-3'>
            <h2 className='w-full font-bold text-[14px] leading-5  tracking-normal text-[#191C1E]'>{title}</h2>
            <span className='font-semibold text-[12px] leading-4 tracking-normal text-[#45474C]'>{day} {hour} </span>
      </div>
    </div>
  )
}

export default CalenderItem
