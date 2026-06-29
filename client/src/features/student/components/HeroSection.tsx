import React from 'react'
interface HeroSectionProps{
    userName:string|undefined;
}
function HeroSection({userName}:HeroSectionProps) {
  return (
    <div className='w-full max-w-[944] gap-2'>
        <div className='w-full mb-1'>
            <h1 className='font-bold text-primary text-5xl leading-16 tracking-[-0.96] '>أهلاً بك مجدداً يا {userName}!</h1>
        </div>
        <div className='w-full'>
            <span className='font-normal text-[#45474C] text-[16px] leading-6 '>سعداء بلقائك مجدداً. إليك لمحة سريعة عما أنجزته اليوم.</span>
        </div>
    </div>
  )
}

export default HeroSection
