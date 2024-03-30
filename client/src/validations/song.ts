import { FormValues } from "@/models/formvalues";

export function validate(values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.title.trim()) {
    errors.title = "Title is required";
  }

  if (!values.artist.trim()) {
    errors.artist = "Artist is required";
  }

  if (!values.genre.trim()) {
    errors.genre = "Genre is required";
  }

  if (!values.image) {
    errors.image = "Image is required";
  } else {
    if (values.image.size > 5242880) {
      // 5MB in bytes
      errors.image = "Image size should be less than 5MB";
    }

    if (!["image/jpeg", "image/png", "image/jpg"].includes(values.image.type)) {
      errors.image = "Image should be in JPEG or PNG format";
    }
  }

  if (!values.audio) {
    errors.audio = "Audio is required";
  } else {
    if (values.audio.size > 10485760) {
      // 10MB in bytes
      errors.audio = "Audio size should be less than 10MB";
    }

    if (!["audio/mpeg", "audio/wav", "audio/mp3"].includes(values.audio.type)) {
      errors.audio = "Audio should be in MP3 or WAV format";
    }
  }

  return errors;
}
