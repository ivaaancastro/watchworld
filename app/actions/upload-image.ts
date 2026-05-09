"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveWatchImage(data: {
  watchId: string;
  url: string;
  altText?: string;
  isPrimary?: boolean;
}) {
  try {
    // If this is set as primary, unset other primary images for this watch
    if (data.isPrimary) {
      await prisma.watchImage.updateMany({
        where: { watchId: data.watchId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    // Save the new image
    const image = await prisma.watchImage.create({
      data: {
        watchId: data.watchId,
        url: data.url, // this will be the Cloudinary public_id or secure_url
        altText: data.altText,
        isPrimary: data.isPrimary ?? false,
      },
    });

    // Revalidate paths so the UI updates immediately
    revalidatePath("/catalog");
    revalidatePath("/");
    revalidatePath("/admin/watches");

    return { success: true, image };
  } catch (error) {
    console.error("Error saving watch image:", error);
    return { success: false, error: "Failed to save image to database." };
  }
}
