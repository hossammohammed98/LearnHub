"use client";

import { useState } from "react";

interface AvatarProps {
  src?: string;          
  alt?: string;         
  size?: "sm" | "md" | "lg"; 
  className?: string;    
}

export default function Avatar({ src, alt = "حسابي", size = "md", className = "" }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

 
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-9 w-9", 
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200 shrink-0 flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <svg
          className="text-gray-500 w-1/2 h-1/2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
    </div>
  );
}