// import {z} from "zod"

// export const formSchema = z.object({
//   title: z.string().min(3).max(50),
//   description: z.string().min(20).max(300),
//   category: z.string().min(2).max(20),
//   image_link: z.string().url().refine(async (url)=> {
//     try {
//       const res = await fetch(url, {method: "HEAD"})
//       const contentType = res.headers.get("content-type")

//       return contentType?.startsWith("image/")
//     }
//     catch{
//       return false
//     }
//   }),
//   pitch: z.string().min(10)
// })


import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(20).max(300),
  category: z.string().min(2).max(20),
  image_link: z.string().url({ message: "Invalid URL format" }).refine((url) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    return imageExtensions.some((ext) => url.endsWith(ext));
  }, { message: "URL must point to an image file" }),

  pitch: z.string().min(10),
});