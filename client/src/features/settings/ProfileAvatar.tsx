import Image from "next/image";
import { Camera } from "lucide-react";

export default function ProfileAvatar() {
  return (
    <div className="relative group">
      <Image
        src="/images/student.jpg"
        alt="User Avatar"
        width={128}
        height={128}
        className="rounded-3xl border-4 object-cover"
      />

      <button
        className="relative bottom-9 right-2 rounded-xl bg-primary p-2 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="تغيير الصورة"
      >
        <Camera size={18} />
      </button>
    </div>
  );
}