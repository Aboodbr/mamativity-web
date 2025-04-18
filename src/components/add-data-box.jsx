import pdf from "@/assets/pdfImage.png";
import youtube from "@/assets/youtubeImage.png";
import image from "@/assets/imageImage.png";
import textIcon from "@/assets/textIcon.png"; // You'll need to add this icon

const AddDataBox = ({ selectedData, setSelectedData }) => {
  return (
    <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
      <div
        className={`p-[3px] ${
          selectedData === "pdf" ? "bg-gradient-to-r" : "hover:translate-0.5"
        } from-[#94c3fc] to-[#CBF3FF] w-full rounded-xl overflow-hidden`}
      >
        <div
          className={`cursor-pointer p-4 md:p-6 bg-white  flex flex-row md:flex-col xl:flex-row items-center gap-2 w-full h-full rounded-xl ${
            selectedData === "pdf" ? "" : "border border-black/30"
          }`}
          onClick={() => setSelectedData("pdf")}
        >
          <img src={pdf} className="w-16 md:w-1/2" />
          <div>
            <span className="font-medium">Add pdf</span>
          </div>
        </div>
      </div>
      <div
        className={`p-[3px] ${
          selectedData === "link" ? "bg-gradient-to-r" : "hover:translate-0.5"
        } from-[#94c3fc] to-[#CBF3FF] w-full rounded-xl overflow-hidden`}
      >
        <div
          className={`cursor-pointer bg-white p-4 md:p-6  flex flex-row md:flex-col xl:flex-row items-center gap-2 w-full h-full rounded-xl ${
            selectedData === "link" ? "" : "border border-black/30"
          }`}
          onClick={() => setSelectedData("link")}
        >
          <img src={youtube} className="w-16 md:w-1/2" />
          <div className="ml-3">
            <span className="font-medium">Add Links</span>
          </div>
        </div>
      </div>

      <div
        className={`p-[3px] ${
          selectedData === "image" ? "bg-gradient-to-r" : "hover:translate-0.5"
        }  from-[#94c3fc] to-[#CBF3FF] w-full rounded-xl overflow-hidden`}
      >
        <div
          className={`cursor-pointer p-4 md:p-6 bg-white  flex flex-row md:flex-col xl:flex-row items-center gap-2 w-full h-full rounded-xl ${
            selectedData === "image" ? "" : "border border-black/30"
          }`}
          onClick={() => setSelectedData("image")}
        >
          <img src={image} className="w-16 md:w-1/2" />
          <div className="ml-3">
            <span className="font-medium">Add Photo</span>
          </div>
        </div>
      </div>

      {/* New Text Box */}
      <div
        className={`p-[3px] ${
          selectedData === "text" ? "bg-gradient-to-r" : "hover:translate-0.5"
        }  from-[#94c3fc] to-[#CBF3FF] w-full rounded-xl overflow-hidden`}
      >
        <div
          className={`cursor-pointer p-4 md:p-6 bg-white flex flex-row md:flex-col xl:flex-row items-center gap-2 w-full h-full rounded-xl ${
            selectedData === "text" ? "" : "border border-black/30"
          }`}
          onClick={() => setSelectedData("text")}
        >
          <img src={textIcon} className="w-16 md:w-1/2" />
          <div className="ml-3">
            <span className="font-medium">Add Text</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDataBox;
