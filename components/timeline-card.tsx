import { MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { TimelineItem } from "@/types";

export function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <Card className="bg-background/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="text-left">
        <h3 className="text-xl font-semibold text-foreground mb-1 font-space-grotesk">
          {item.title}
        </h3>
        <p className="text-primary/80 font-medium mb-2">{item.institution}</p>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 ltr:flex-row rtl:flex-row-reverse">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2 ltr:flex-row rtl:flex-row-reverse">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{item.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
