import React from 'react';

interface CurrentCourseProps {
  imgUrl?: string;
  badge?: React.ReactNode;
  courseLevel?: React.ReactNode;
}

export default function CurrentCourse({ 
  imgUrl = '/images/login.jpg', // Fallback default image
  badge, 
  courseLevel 
}: CurrentCourseProps) {
  
  const containerStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(9, 20, 38, 0.6) 0%, rgba(9, 20, 38, 0) 100%), url(${imgUrl})`,
  };

  return (
    <div 
      style={containerStyle}
      className="relative w-full max-w-[310px] h-[380px] bg-cover bg-center rounded-lg overflow-hidden shadow-sm flex flex-col justify-end p-4"
    >
      <div className="relative z-10 flex flex-row gap-2 w-full justify-start items-center">
        {badge}
        {courseLevel}
      </div>
    </div>
  );
}