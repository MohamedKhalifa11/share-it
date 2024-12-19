import { z } from "zod";

const validateImageUrl = async (url: string) => {
  // Check for traditional image file extensions
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  if (imageExtensions.some((ext) => url.endsWith(ext))) {
    return true;
  } else {
    try {
      // Send a HEAD request to check the Content-Type
      const res = await fetch(url, { method: "HEAD" });

      if (!res.ok) return false;
      const contentType = res.headers.get("content-type");
      return contentType?.startsWith("image/");
    } catch {
      return false;
    }
  }
};

export const formSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(20).max(300),
  category: z.string().min(2).max(20),
  image_link: z
    .string()
    .url()
    .refine((url) => validateImageUrl(url), {
      message: "URL must point to a valid image file",
    }),

  pitch: z.string().min(10),
});
