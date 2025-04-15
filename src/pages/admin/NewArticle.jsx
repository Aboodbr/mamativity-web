import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ImageIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "@/utils/uploadToCloudinary";

export default function NewArticle() {
  const [formData, setFormData] = useState({
    excerpt: "", // Sub headline
    publicationDate: "",
    imageCaption: "",
    content: "", // Article details
    category: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      try {
        const url = await uploadFileToCloudinary(file);
        setImageUrl(url);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePublish = async () => {
    if (!formData.category) {
      alert("Please select a category!");
      return;
    }

    try {
      await addDoc(collection(db, formData.category), {
        excerpt: formData.excerpt,
        publicationDate: formData.publicationDate,
        imageCaption: formData.imageCaption,
        imageUrl: imageUrl,
        content: formData.content,
        createdAt: new Date().toISOString(),
      });

      alert("Article published successfully!");
      setFormData({
        excerpt: "",
        publicationDate: "",
        imageCaption: "",
        content: "",
        category: "",
      });
      setImagePreview(null);
      setImageUrl("");
    } catch (error) {
      console.error("Error publishing article:", error);
      alert("Failed to publish article.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link to="/admin/articles" className="text-blue-500 mr-2">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-xl font-medium mr-2 hidden lg:flex">
              Articles
            </h1>
            <span className="text-xl font-medium hidden lg:flex">
              Add new articles
            </span>
          </div>
          <div className="flex gap-3">
            {/* إخفاء زر Save to draft مؤقتاً */}
            <Button
              onClick={handlePublish}
              className="text-black bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none"
            >
              Publish
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="w-full lg:w-2/3">
            {/* Category */}
            <div className="mb-6">
              <label className="block mb-1 font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Select the most relevant category for your content
              </p>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="Pregnancy problems">Pregnancy problems</option>
                  <option value="Maternity bag">Maternity bag</option>
                  <option value="Mothers health">Mothers health</option>
                  <option value="Children and newborns">
                    Children and newborns
                  </option>
                  <option value="Children's vaccinations">
                    Children vaccinations
                  </option>
                  <option value="Breastfeeding">Breastfeeding</option>
                </select>
              </div>
            </div>

            {/* Sub headline */}
            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Sub headline <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Describe your content in less than 150 characters.
              </p>
              <div className="relative">
                <Textarea
                  name="excerpt"
                  placeholder="Description"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  maxLength={150}
                  className="resize-none pr-10 rounded-md focus:border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <span className="absolute right-3 bottom-2 text-xs text-gray-400">
                  {formData.excerpt.length}/150
                </span>
              </div>
            </div>

            {/* Publication date */}
            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Publication date <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="publicationDate"
                placeholder="DD/MM/YYYY   HH:MM AM/PM"
                value={formData.publicationDate}
                onChange={handleInputChange}
                className="rounded-md focus:border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image cover and Caption */}
            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Image cover <span className="text-red-500">*</span>
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                onClick={triggerFileInput}
              >
                <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center mb-2">
                  <ImageIcon className="h-6 w-6 text-pink-500" />
                </div>
                <p className="text-sm font-medium">Upload images</p>
                <p className="text-xs text-gray-500">
                  Click to browse (5 MB Max)
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              {/* Image Caption */}
              <div className="mt-4">
                <label className="block mb-1 font-medium">
                  Image Caption <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="imageCaption"
                  placeholder="Enter image caption"
                  value={formData.imageCaption}
                  onChange={handleInputChange}
                  className="rounded-md focus:border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Article details */}
            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Article details <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-200 rounded-md">
                <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Heading3 className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  name="content"
                  placeholder="Description"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  rows={6}
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-1/3">
            <h2 className="font-medium mb-4">Live Preview</h2>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="bg-gray-200 h-48 w-full mb-4">
                {imagePreview && (
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <p className="text-gray-700 mb-2">
                {formData.excerpt || "Sub headline preview"}
              </p>

              <p className="text-gray-600 text-sm mb-2">
                {formData.imageCaption || "Image caption preview"}
              </p>

              <p className="text-gray-600 text-sm">
                {formData.content || "Article details preview"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
