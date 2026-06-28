import { LucideIcon } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

interface NotificationItemProps {
  title: string;
  description: string;
  enabled: boolean;
  icon: LucideIcon;
}

export default function NotificationItem({
  title,
  description,
  enabled,
  icon: Icon,
}: NotificationItemProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4 transition-colors hover:bg-gray-100">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon size={20} />
        </div>

        <div>
          <h4 className="font-semibold">{title}</h4>

          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <ToggleSwitch checked={enabled} />
    </div>
  );
}