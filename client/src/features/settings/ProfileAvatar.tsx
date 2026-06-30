"use client";

import Image from "next/image";

interface ProfileAvatarProps {
  avatarUrl?: string;
  userName?: string;
}

export default function ProfileAvatar({
  avatarUrl = "/images/user.png",
  userName = "المستخدم",
}: ProfileAvatarProps) {
  return (
    <div className="relative group shrink-0">
      <Image
        src={avatarUrl}
        alt={userName}
        width={128}
        height={128}
        className="rounded-3xl border-4 object-cover"
      />
    </div>
  );
}
