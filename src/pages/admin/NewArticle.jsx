import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ImageIcon, Bold, Italic, List, ListOrdered, Code, Heading1, Heading2, Heading3 } from "lucide-react"
import {Link} from "react-router-dom"

export default function NewArticle() {
  const [formData, setFormData] = useState({
    headline: "",
    excerpt: "",
    publicationDate: "",
    imageCaption: "",
    content: "",
    publishingSchedule: "",
  })

  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link to="/admin/articles" className="text-blue-500 mr-2">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-xl font-medium mr-2 hidden md:flex">Articles</h1>
            <span className="text-xl font-medium hidden md:flex">Add new articles</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-blue-500 text-blue-500">
              Save to draft
            </Button>
            <Button className=" text-black bg-gradient-to-b from-[#94c3fc] to-[#CBF3FF] border-none">Publish</Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="w-full md:w-2/3">
            <div className="mb-6">
              <label className="block mb-1 font-medium">
                Headline <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Make sure that the headline you input is more than 90 characters
              </p>
              <div className="relative">
                <Input
                  name="headline"
                  placeholder="Headline"
                  value={formData.headline}
                  onChange={handleInputChange}
                  maxLength={90}
                  className="pr-10"
                />
                <span className="absolute right-3 bottom-2 text-xs text-gray-400">{formData.headline.length}/90</span>
              </div>
            </div>

            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-2">Describe your content in less than 150 characters.</p>
              <div className="relative">
                <Textarea
                  name="excerpt"
                  placeholder="Description"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  maxLength={150}
                  className="resize-none pr-10"
                  rows={3}
                />
                <span className="absolute right-3 bottom-2 text-xs text-gray-400">{formData.excerpt.length}/150</span>
              </div>
            </div>

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
              />
            </div>

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
                <p className="text-xs text-gray-500">Click to browse (5 MB Max)</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Image caption <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-2">Describe your content in less than 150 characters.</p>
              <div className="relative">
                <Textarea
                  name="imageCaption"
                  placeholder="Description"
                  value={formData.imageCaption}
                  onChange={handleInputChange}
                  maxLength={150}
                  className="resize-none pr-10"
                  rows={3}
                />
                <span className="absolute right-3 bottom-2 text-xs text-gray-400">
                  {formData.imageCaption.length}/150
                </span>
              </div>
            </div>

            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Content article <span className="text-red-500">*</span>
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

            <div className="mb-6 mt-10">
              <label className="block mb-1 font-medium">
                Publishing Schedule <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="publishingSchedule"
                placeholder="DD/MM/YYYY   HH:MM AM/PM"
                value={formData.publishingSchedule}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-full md:w-1/3">
            <h2 className="font-medium mb-4">Live Preview</h2>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-medium mb-2">
                {formData.headline ||
                  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin"}
              </h3>

              <div className="bg-gray-200 h-48 w-full mb-4">
                {imagePreview && (
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                )}
              </div>

              <p className="text-gray-700 mb-2">{formData.excerpt || "Contrary to popular belief, Lorem Ipsum"}</p>

              <p className="text-gray-600 text-sm">
                {formData.content ||
                  'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

