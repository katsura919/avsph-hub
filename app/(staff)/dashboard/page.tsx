import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb, Wrench } from "lucide-react";
import { TOP_LINKS } from "@/components/docs/data";

export default function StaffDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">VA Resources</h3>
        <p className="text-muted-foreground text-sm">
          Access important documentation, onboarding material, and helpful tools
          for your daily tasks.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TOP_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.id}
                href={`/docs?tab=${link.id}`}
                className="transition-all hover:scale-[1.02]"
              >
                <Card className="h-full hover:border-primary/50 cursor-pointer transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {link.label}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold mb-1">{link.title}</div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {link.desc}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold tracking-tight mb-4">Coming Soon</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Placeholder for Tips */}
            <Card className="h-full opacity-60 border-dashed">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tips & Best Practices
                </CardTitle>
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold mb-1">Coming Soon</div>
                <p className="text-xs text-muted-foreground">
                  Helpful advice for productivity and client management.
                </p>
              </CardContent>
            </Card>

            {/* Placeholder for Tools */}
            <Card className="h-full opacity-60 border-dashed">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Recommended Tools
                </CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold mb-1">Coming Soon</div>
                <p className="text-xs text-muted-foreground">
                  Software and extensions to enhance your workflow.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
