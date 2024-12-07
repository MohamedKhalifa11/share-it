"use client";
import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
// import Image from "next/image";
// import { writeClient } from "@/sanity/lib/write-client";
// import Link from "next/link";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const BlogForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store the URL of the uploaded image
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        image_link: formData.get("image_link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      console.log(formValues);

      // const result = await createIdea(prevState, formData, pitch);
      // console.log(result);

      // if (result.status == "SUCCESS") {
      //   toast({
      //     title: "Success",
      //     description: "Your startup pitch has been created successfully",
      //   });

      //   router.push(`/blog/${result._id}`);
      // }

      // console.log(result);
      // return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation Failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  // // Function to upload image to Sanity
  // const uploadImage = async (file: File) => {
  //   try {
  //     const uploadedImage = await writeClient.assets
  //       .upload("image", file)
  //       .then((document) => {
  //         console.log("Uploaded image URL:", document.url); // Log the URL of the uploaded image
  //         return document.url; // Return the URL
  //       });
  //     return uploadedImage;
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     return null;
  //   }
  // };

  // // Handle image upload and preview
  // const handleImageUpload = async (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the image to preview locally
  //     setImagePreview(imageUrl); // Set the preview URL for the image

  //     // Upload the image to Sanity and get the URL
  //     const uploadedImageUrl = await uploadImage(file);
  //     if (uploadedImageUrl) {
  //       setImageUrl(uploadedImageUrl); // Save the uploaded image URL from Sanity

  //       console.log("Uploaded image URL from Sanity:", uploadedImageUrl);
  //     }
  //   }
  // };

  const handleImageLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const url = event.target.value;
    setImageUrl(url); // Set the provided URL as the image URL
  };

  return (
    <form action={formAction} className="blog-form">
      <div>
        <label htmlFor="title" className="blog-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="blog-form_input"
          required
          placeholder="Blog Title"
        />

        {errors.title && <p className="blog-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="blog-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="blog-form_textarea"
          required
          placeholder="Blog Description"
        />

        {errors.description && (
          <p className="blog-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="blog-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="blog-form_input"
          required
          placeholder="Blog Category (Software Development, IT, Health, ...)"
        />

        {errors.category && (
          <p className="blog-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="image_link" className="blog-form_label">
          Image Link
        </label>
        <Input
          id="image_link"
          name="image_link"
          className="blog-form_input"
          required
          type="url"
          placeholder="Cover Image BLog Url"
          onChange={handleImageLinkChange}
        />

        {imageUrl && (
          <div className="mt-4">
            <p>Preview of the cover image:</p>
            <img
              src={imageUrl}
              alt="Image Preview"
              className="max-w-72 rounded"
            />
          </div>
        )}

        {errors.image_link && (
          <p className="blog-form_error">{errors.image_link}</p>
        )}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="blog-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{ placeholder: "Write your blog here" }}
          previewOptions={{ disallowedElements: ["style"] }}
        />

        {errors.pitch && <p className="blog-form_error">{errors.pitch}</p>}
      </div>

      {/* <div>
        <label htmlFor="image_upload" className="blog-form_label">
          Upload Image
        </label>
        <Input
          type="file"
          id="image_upload"
          name="image_upload"
          className="blog-form_input cursor-pointer"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {imagePreview && (
          <div className="mt-4">
            <Image src={imagePreview} alt="Preview" width={100} height={100} />
          </div>
        )}

        {imageUrl && (
          <div className="mt-4">
            <p>Uploaded Image URL:</p>
            <Link href={imageUrl} target="_blank" className="text-blue-500">
              {imageUrl}
            </Link>
          </div>
        )}

        {errors.image_upload && (
          <p className="blog-form_error">{errors.image_upload}</p>
        )}
      </div> */}
      <Button
        type="submit"
        className="blog-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit your Blog"}
        <SendIcon className="ml-2 size-6" />
      </Button>
    </form>
  );
};

export default BlogForm;
