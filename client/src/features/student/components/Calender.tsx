import { Calendar, Calendar1Icon } from 'lucide-react'
import React from 'react'
interface CalendarProps{
  children:React.ReactNode
}
function Calender({children}:CalendarProps) {
  return (
    <div className='w-full border border-gray-100 rounded-lg shadow-sm flex flex-col justify-start items-start p-6 bg-[#FFFFFF] gap-5 h-full'>
      <div className='flex items-center gap-2.5 w-full'>
        <Calendar className='text-[#006C49] font-bold'></Calendar>
        <p className=' text-primary  font-medium text-[14px] tracking-[0.14] leading-5'>الجلسات القادمة</p>
      </div>
      <div className='flex flex-col gap-4 items-start w-full'>
            {children}
      </div>
    </div>
  )
}

export default Calender
