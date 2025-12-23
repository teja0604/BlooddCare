import { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiCheckCircle } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

export default function UploadPrescription() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected && selected.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", "1"); // TODO: replace with logged-in userId

      await api.post("/prescriptions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploaded(true);
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        className="text-2xl font-bold text-red-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Upload Prescription
      </motion.h1>

      <Card className="p-6 space-y-4 text-center">
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg hover:border-red-500 transition"
        >
          <FiUpload className="text-4xl text-gray-500 mb-2" />
          <span className="text-gray-600">Click to select file</span>
          <span className="text-xs text-gray-400">Supported: JPG, PNG, PDF</span>
        </label>

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover mx-auto rounded-lg"
            />
          </div>
        )}

        {file && (
          <Button
            onClick={handleUpload}
            disabled={loading}
            className="w-full flex items-center justify-center mt-4"
          >
            {loading ? "Uploading..." : "Upload Prescription"}
          </Button>
        )}

        {uploaded && (
          <div className="flex items-center justify-center text-green-600 mt-4">
            <FiCheckCircle className="mr-2" />
            Prescription uploaded successfully!
          </div>
        )}
      </Card>
    </div>
  );
}
