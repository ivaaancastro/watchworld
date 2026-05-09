"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { saveWatchImage } from "@/app/actions/upload-image";
import { useState } from "react";

export function ImageUploader({ watchId, watchName }: { watchId: string; watchName: string }) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <CldUploadWidget
      uploadPreset="watchworld_preset" // You will need to create an unsigned preset in Cloudinary Settings
      options={{
        multiple: false,
        folder: "watchworld/watches",
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "avif"],
      }}
      onSuccess={async (result) => {
        setIsUploading(true);
        try {
          if (typeof result.info === "object" && result.info !== null) {
            // result.info.public_id is the unique Cloudinary ID
            // result.info.secure_url is the full URL
            const url = result.info.secure_url;
            await saveWatchImage({
              watchId,
              url,
              altText: watchName,
              isPrimary: true, // Auto-set as primary for now
            });
            alert("¡Imagen guardada correctamente!");
          }
        } catch (error) {
          console.error("Error al guardar la imagen en BD", error);
          alert("La imagen se subió a Cloudinary pero falló al guardar en la base de datos.");
        } finally {
          setIsUploading(false);
        }
      }}
    >
      {({ open }) => {
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => open()}
            disabled={isUploading}
            className="flex items-center gap-2 border-primary/20 hover:bg-primary/10"
          >
            <ImagePlus className="h-4 w-4 text-primary" />
            <span className="text-primary">{isUploading ? "Guardando..." : "Subir Imagen"}</span>
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
