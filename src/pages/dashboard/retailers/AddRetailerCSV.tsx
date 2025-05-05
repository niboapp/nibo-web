import { useNavigate } from "react-router-dom";
import { ChevronLeft, CloudIcon } from "lucide-react";
import { useState } from "react";

const AddRetailerCSV = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col max-w-4xl mx-auto px-4 pt-14">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-medium">Upload Retailer CSV</h1>
          <p className="text-sm text-gray-500">
            Automatically upload batch retailer CSV
          </p>
        </div>
      </div>
      <FileUploadForm />
    </div>
  );
};

export default AddRetailerCSV;

const FileUploadForm = () => {
  const [file, setFile] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Uploading file:", file);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 bg-gray-50 transition-colors ${
            isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CloudIcon className="w-16 h-16 text-gray-300 mb-4" />

          <p className="text-sm text-gray-600 text-center mb-2">
            Choose a XLSX file or drag & drop it here
          </p>
          <p className="text-xs text-gray-500 text-center mb-4">
            Upload up to 5 Mb file size: 5mb
          </p>

          <label className="inline-block">
            <span className="text-pink-500 underline font-medium text-sm cursor-pointer hover:text-pink-600">
              browse
            </span>
            <input
              type="file"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <div className="mt-4 text-sm text-gray-700">
              Selected file: {file.name}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className=" bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded"
          >
            Add Retailers
          </button>
        </div>
      </form>
    </div>
  );
};
