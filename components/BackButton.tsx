"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      onClick={() => router.back()}
    >
      <ArrowLeft />
      Back
    </Button>
  );
};

export default BackButton;
