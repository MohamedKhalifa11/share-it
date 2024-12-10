"use server";

import { writeClient } from "@/sanity/lib/write-client";
import { auth } from "./auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, image_link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );
  console.log("Form:");
  console.log(form);

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const blog = {
      title,
      description,
      category,
      image: image_link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "blog", ...blog });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
