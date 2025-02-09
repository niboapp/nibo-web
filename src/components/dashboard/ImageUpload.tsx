import { useState } from "react";
import { Upload } from "lucide-react";

const ImageUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    setUploading(true);
    setError(null);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", `NIBO_UPLOAD`);

      const response = await fetch(`${import.meta.env.VITE_CLOUDINARY_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      if (onUploadSuccess) {
        onUploadSuccess(data.secure_url);
      }
      setSuccess(true);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Image Upload</h2>
      </div>

      <div className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="w-full p-2 border border-gray-300 rounded cursor-pointer disabled:opacity-50"
        />

        {preview && (
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm">
            You have succesfully uploaded this image.
          </p>
        )}

        <p className="text-sm text-gray-500">
          {uploading ? "Uploading..." : "Supported formats: JPG, PNG, GIF"}
        </p>
      </div>
    </div>
  );
};

export default ImageUpload;
