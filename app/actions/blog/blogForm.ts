import { isAllowedImage } from "@/lib/storage";

export type BlogFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function readBlogFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const dateValue = String(formData.get("date") ?? "").trim();
  const imageValue = formData.get("image");

  const fieldErrors: Record<string, string> = {};
  if (!title) fieldErrors.title = "Title is required.";
  if (!body) fieldErrors.body = "Body is required.";

  let date = new Date();
  if (dateValue) {
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) {
      fieldErrors.date = "Date is not valid.";
    } else {
      date = parsed;
    }
  }

  let image: File | null = null;
  if (imageValue instanceof File && imageValue.size > 0) {
    if (!isAllowedImage(imageValue)) {
      fieldErrors.image = "Use a JPG, PNG, WebP, AVIF or GIF image.";
    } else if (imageValue.size > MAX_IMAGE_BYTES) {
      fieldErrors.image = "Image must be 5 MB or smaller.";
    } else {
      image = imageValue;
    }
  }

  return {
    values: { title, excerpt, body, date },
    image,
    fieldErrors,
    valid: Object.keys(fieldErrors).length === 0,
  };
}
