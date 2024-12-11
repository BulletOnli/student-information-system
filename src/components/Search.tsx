import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-xl mx-auto overflow-hidden">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search bar"
        className="pl-8 rounded-full text-center border-commonGreen bg-commonGreen/10"
      />
    </div>
  );
}
