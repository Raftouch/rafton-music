"use client";

import FileUpload from "@/components/FileUpload";
import { useInput } from "@/hooks/useInput";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Song } from "@/models/song";
import { toast } from "sonner";
import { API_URL } from "@/utils/const";

interface FormError {
  field: string | null;
  constraints: string[];
}

interface UpdateSongFormProps {
  song: Song;
}

export default function UpdateSongForm({ song }: UpdateSongFormProps) {
  const [image, setImage] = useState<File | string | undefined>(song?.image);
  const [audio, setAudio] = useState<File | string | undefined>(song?.audio);
  const [formErrors, setFormErrors] = useState<FormError[] | null>(null);
  const title = useInput(song?.title);
  const artist = useInput(song?.artist.name);
  const genre = useInput(song?.genre.type);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormErrors(null);

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("artist[name]", artist.value);
    formData.append("genre[type]", genre.value);
    if (image) formData.append("image", image);
    if (audio) formData.append("audio", audio);

    try {
      const response = await fetch(`${API_URL}/api/songs/${song?.id}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        setFormErrors(responseData.errors);
        return;
      }

      toast.success("Song successfully updated");
      router.push("/songs");
    } catch (error) {
      toast.error("Failed to update song");
    }
    // fetch(`${API_URL}/api/songs/${song?.id}`, {
    //   method: 'PATCH',
    //   body: formData,
    //   credentials: 'include',
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       toast.success('Song successfully updated')
    //       router.push('/songs')
    //     } else {
    //       toast.error('Failed to update song')
    //       throw new Error('Failed to submit form')
    //     }
    //   })
    //   .catch((error) => console.error(error))
  };

  const getErrorMessage = (field: string) => {
    const error = formErrors?.find((error) => error.field === field);
    return error?.constraints?.[0];
  };

  return (
    <form
      className="flex flex-col min-w-[50%] bg-white text-rafton-blue mt-20 mb-20 gap-10 p-10 rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full border-2"
            {...title}
          />
          {getErrorMessage("title") && (
            <p className="text-xs text-red-500">{getErrorMessage("title")}</p>
          )}
        </div>
        <div>
          <label htmlFor="artist">Artist</label>
          <input
            type="text"
            id="artist"
            name="artist"
            required
            className="w-full border-2"
            {...artist}
          />
          {getErrorMessage("artist") && (
            <p className="text-xs text-red-500">{getErrorMessage("artist")}</p>
          )}
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            required
            className="w-full border-2"
            {...genre}
          />
          {getErrorMessage("genre") && (
            <p className="text-xs text-red-500">{getErrorMessage("genre")}</p>
          )}
        </div>
      </div>

      <FileUpload
        setFile={(file: File | null) => setImage(file || undefined)}
        accept="image/*"
        maxSize={5242880}
      >
        <button type="button" className="text-rafton-blue">
          Upload image
        </button>
      </FileUpload>

      <FileUpload
        setFile={(file: File | null) => setAudio(file || undefined)}
        accept="audio/*"
        maxSize={10485760}
      >
        <button type="button" className="text-rafton-blue m-auto">
          Upload audio
        </button>
      </FileUpload>

      <button type="submit">Update</button>

      {formErrors
        ?.find((error) => error.field === null)
        ?.constraints?.map((msg) => (
          <p key={msg} className="text-xs text-red-500">
            {msg}
          </p>
        ))}
    </form>
  );
}
