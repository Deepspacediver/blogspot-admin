import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-3.5rem)]">
      <LoaderCircle className="animate-spin text-primary size-12" />
    </div>
  );
}
