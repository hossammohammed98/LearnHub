import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/ButtonInit";
import { Star, UsersRound } from "lucide-react";
import Image from "next/image";

interface CourseCardProps {
  name: string;
  studentNum:number;
  rating: number;
  ratingCount:number;
  state:string;
}

function RecentCourseCard({
    name= "أساسيات التصميم المعماري",
  studentNum=450,
  rating=120,
  ratingCount=rating,
  state="نشط"
}:CourseCardProps) {
  return (
    <div className="w-full flex flex-wrap gap-6 p-6  items-end  border-t-2 border-[#E6E8EA]">
      <Image
        loading="eager"
        className="rounded-2xl w-20 h-20"
        width={48}
        height={48}
        src="/images/cource_icon.jpeg"
        alt="user photo"
      />
      <div className="flex flex-wrap flex-col justify-between items-start gap-4 font-sans text-primary">
        <p>{name}</p>
        <div className="flex flex-wrap justify-start pl-23 items-center gap-6 text-[12px]">
          <p className="flex justify-center items-center gap-1">
            <UsersRound width={16} height={12} />
            {studentNum} طالب
          </p>
          <p className="flex flex-wrap justify-center items-center gap-1">
            <Star width={16} height={12} />
            {rating} ({ratingCount} تقييم)
          </p>
          <Badge variant="info">{state}</Badge>
        </div>
      </div>
      <div>
        <Button variant="warning" size="sm">
          إدارة
        </Button>
      </div>
    </div>
  );
}

export default RecentCourseCard;
