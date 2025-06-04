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
import Swal from "sweetalert2";

export default function NewArticle() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    publicationDate: "",
    content: "",
    category: "",
    images: [],
  });

  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const additionalFileInputRef = useRef(null);

  // قائمة العناوين بناءً على الفئة
  const titleOptions = {
    Breastfeeding: ["breastfeeding-natural-", "formula-feeding-artifi-"],
    Home: [
      "baby-care-tips",
      "frequently-asked-questions",
      "physical-activity",
      "rest-and-sleep",
    ],
    "Children and newborns": [
      "baby-health-and-common-illnesses",
      "child-growth-stages",
      "complementary-feeding-introducing-solid-foods-",
      "daily-baby-care",
      "sensory-and-motor-skills-development",
    ],
    "Mothers health": [
      "general-women-s-health",
      "women-s-health-after-childbirth",
      "women-s-health-before-pregnancy",
      "women-s-health-during-pregnancy",
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // إعادة تعيين title عند تغيير category
      ...(name === "category" ? { title: "" } : {}),
    }));
  };

  const handleAdditionalImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const previews = [];
      const urls = [];

      for (const file of files) {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          setAdditionalImagePreviews([...previews]);
        };
        reader.readAsDataURL(file);

        try {
          const url = await uploadFileToCloudinary(file);
          urls.push(url);
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, url],
          }));
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error);
        }
      }
    }
  };

  const triggerAdditionalFileInput = () => {
    additionalFileInputRef.current?.click();
  };

  const handlePublish = async () => {
    if (
      !formData.category ||
      !formData.title ||
      !formData.subtitle ||
      !formData.content ||
      !formData.publicationDate
    ) {
      Swal.fire({
        title: "Missing Fields!",
        text: "Please fill in all required fields: category, title, subtitle, content, and publication date!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      // تنظيف subtitle ليصبح صالحًا كاسم مجموعة (اختياري، يمكن إزالته إذا لم يكن ضروريًا)
      const sanitizeString = (str) => {
        return str
          .toLowerCase()
          .replace(/[^a-z0-9-_]/g, "-")
          .replace(/-+/g, "-")
          .trim("-");
      };

      const sanitizedSubtitle = sanitizeString(formData.subtitle);

      // إنشاء مرجع للمقالة في المسار الجديد: /article/{category}/{title}/{auto_id}
      const articleRef = collection(
        db,
        "article",
        formData.category,
        formData.title
      );

      // حفظ بيانات المقالة
      await addDoc(articleRef, {
        category: formData.category,
        title: formData.title,
        subtitle: formData.subtitle,
        publicationDate: formData.publicationDate,
        content: formData.content,
        images: formData.images,
        createdAt: new Date().toISOString(),
        articleId: Date.now().toString(), // معرف فريد للمقالة
      });

      Swal.fire({
        title: "Success!",
        text: "Article published successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });

      setFormData({
        title: "",
        subtitle: "",
        publicationDate: "",
        content: "",
        category: "",
        images: [],
      });
      setAdditionalImagePreviews([]);
    } catch (error) {
      console.error("Error publishing article:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to publish article.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
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
          <Button
            onClick={handlePublish}
            className="text-black bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none"
          >
            Publish
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="mb-6">
              <label className="block mb-1 font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Select the most relevant category for your content
              </p>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="Home">Home</option>
                <option value="Mothers health">Mothers health</option>
                <option value="Children and newborns">
                  Children and newborns
                </option>
                <option value="Breastfeeding">Breastfeeding</option>
              </select>
            </div>

            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Select the main title of your article.
              </p>
              <select
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                disabled={!formData.category}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a title</option>
                {formData.category &&
                  titleOptions[formData.category]?.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Subtitle <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Enter a subtitle for your article (less than 200 characters).
              </p>
              <div className="relative">
                <Textarea
                  name="subtitle"
                  placeholder="Subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  maxLength={200}
                  className="resize-none pr-10 rounded-md focus:border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
                <span className="absolute right-3 bottom-2 text-xs text-gray-400">
                  {formData.subtitle.length}/200
                </span>
              </div>
            </div>

            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Publication date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                name="publicationDate"
                placeholder="DD/MM/YYYY   HH:MM AM/PM"
                value={formData.publicationDate}
                onChange={handleInputChange}
                className="rounded-md focus:border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Additional Images
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                onClick={triggerAdditionalFileInput}
              >
                <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center mb-2">
                  <ImageIcon className="h-6 w-6 text-pink-500" />
                </div>
                <p className="text-sm font-medium">Upload additional images</p>
                <p className="text-xs text-gray-500">
                  Click to browse (5 MB Max each)
                </p>
                <input
                  type="file"
                  ref={additionalFileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesUpload}
                />
              </div>
              <div className="flex gap-2 mt-4">
                {additionalImagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Additional preview ${index}`}
                    className="w-16 h-16 object-cover"
                  />
                ))}
              </div>
            </div>

            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Article Content <span className="text-red-500">*</span>
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
                  placeholder="Enter article content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  rows={6}
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <h2 className="font-medium mb-4">Live Preview</h2>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-bold">
                {formData.title || "Title preview"}
              </h3>
              <p className="text-gray-700 mb-2">
                {formData.subtitle || "Subtitle preview"}
              </p>
              <p className="text-gray-600 text-sm mb-2 whitespace-pre-wrap">
                {formData.content || "Article content preview"}
              </p>
              <div className="flex gap-2">
                {additionalImagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Additional preview ${index}`}
                    className="w-24 h-24 object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
