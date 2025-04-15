// src/utils/uploadToCloudinary.js
export const uploadFileToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_unsigned_preset");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dh6wezmpi/auto/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data.secure_url; // رابط الصورة أو الملف بعد الرفع
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
