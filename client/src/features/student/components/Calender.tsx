import { Calendar, Calendar1Icon } from 'lucide-react'
import React from 'react'

function Calender() {
  return (
    <div className=' w-full max-w-[298.67px] rounded-lg overflow-hidden shadow-sm flex flex-col justify-around items-start p-4'>
      <div className='flex items-center gap-2.5'>
        <Calendar className='text-[#006C49] font-bold'></Calendar>
        <p className=' text-primary  font-medium text-[14px] tracking-[0.14] leading-5'>الجلسات القادمة</p>
      </div>
      <div className=''>

      </div>
    </div>
  )
}

export default Calender
