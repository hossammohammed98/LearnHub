import React from 'react'
interface CourseDescriptionProps{
  children?:React.ReactNode;
  title?:string;
  courseName?:string;
  courseDescription?:string;
  progressValue?:number;
}
function CourseDescription({children,title,courseName,courseDescription,progressValue}:CourseDescriptionProps) {
  return (
    <div className='w-full max-w-[310px] h-[380px] rounded-lg overflow-hidden shadow-sm flex flex-col justify-between p-4'>
      <div className=' flex flex-col justify-between items-start gap-2 pb-5 max-w-[246px]'>
            <span className='text-[#005236] font-semibold text-[12px] leading-4 tracking-[0.6px]'>{title}</span>
            <h2 className='text-[#091426] font-semibold text-2xl leading-[30px]'>{courseName}</h2>
            <p className='text-[#45474C] font-normal text-[12px] leading-6 tracking-normal'>{courseDescription}</p>
      </div>
      <div className='max-w-[246px] flex flex-col justify-between items-center gap-6'>
            {children}
      </div>
    </div>
  )
}

export default CourseDescription
