import { isAllowedImage } from "@/lib/storage";

export type ProjectFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function isLink(value: string) {
  return /^https?:\/\/\S+$/i.test(value);
}

export function readProjectFields(formData: FormData) {
  const text = (name: string) => String(formData.get(name) ?? "").trim();

  const title = text("title");
  const description = text("description");
  const viewDemo = text("view_demo");
  const sourceCode = text("source_code");
  const internalPath = text("internal_path");
  const dateValue = text("date");
  const technologies = text("technologies")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const featured = formData.get("featured") === "on";
  const imageValue = formData.get("image");

  const fieldErrors: Record<string, string> = {};
  if (!title) fieldErrors.title = "Title is required.";
  if (!description) fieldErrors.description = "Description is required.";
  if (viewDemo && !isLink(viewDemo)) {
    fieldErrors.view_demo = "Demo link must start with http:// or https://";
  }
  if (sourceCode && !isLink(sourceCode)) {
    fieldErrors.source_code = "Source link must start with http:// or https://";
  }
  if (internalPath && !internalPath.startsWith("/")) {
    fieldErrors.internal_path = "Internal path must start with /";
  }

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
    values: {
      title,
      description,
      view_demo: viewDemo,
      source_code: sourceCode,
      internal_path: internalPath,
      kind: internalPath ? ("embedded" as const) : ("external" as const),
      technologies,
      featured,
      date,
    },
    image,
    fieldErrors,
    valid: Object.keys(fieldErrors).length === 0,
  };
}
