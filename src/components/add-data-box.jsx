import pdf from "@/assets/pdfImage.png";
import youtube from "@/assets/youtubeImage.png";
import image from "@/assets/imageImage.png";

const AddDataBox = ({ selectedData, setSelectedData }) => {
  return (
    <div className="flex gap-4">
      <div className={`p-[3px] ${selectedData === "pdf" ? "bg-gradient-to-r" : "hover:translate-0.5"} from-[#94c3fc] to-[#CBF3FF] w-full rounded-xl overflow-hidden`}>
        <div
          className={`cursor-pointer p-6 bg-white  flex flex-row items-center gap-2 w-full h-full rounded-xl ${
            selectedData === "pdf" ? "" : "border border-black/30"
          }`}
          onClick={() => setSelectedData("pdf")}
        >
          <img src={pdf} />
          <div>
            <span className="font-medium">Add pdf file</span>
            {/* <span className="text-sm text-muted-foreground">
              file name: 0.pdf
            </span>
            <span className="text-sm text-muted-foreground">Size: 91.4 KB</span> */}
          </div>
        </div>
      </div>
      <div className={`p-[3px] ${selectedData === "link" ? "bg-gradient-to-r" : "hover:translate-0.5"} from-[#94c3fc] to-[#CBF3FF] w-full rounded-xl overflow-hidden`}>
        <div
          className={`cursor-pointer bg-white p-6  flex flex-row items-center gap-2 w-full h-full rounded-xl ${
            selectedData === "link" ? "" : "border border-black/30"
          }`}
          onClick={() => setSelectedData("link")}
        >
          <img src={youtube} />
          <div className="ml-3">
            <span className="font-medium">Add Links</span>
            {/* <span className="text-sm text-muted-foreground">Link name:</span>
            <span className="text-sm text-muted-foreground">0.pdf</span> */}
          </div>
        </div>
      </div>

      <div className={`p-[3px] ${selectedData === "image" ? "bg-gradient-to-r" : "hover:translate-0.5"}  from-[#94c3fc] to-[#CBF3FF] w-full rounded-xl overflow-hidden`}>
        <div
          className={`cursor-pointer p-6 bg-white  flex flex-row items-center gap-2 w-full h-full rounded-xl ${
            selectedData === "image" ? "" : "border border-black/30"
          }`}
          onClick={() => setSelectedData("image")}
        >
          <img src={image} />
          <div className="ml-3">
            <span className="font-medium">Add Photo</span>
            {/* <span className="text-sm text-muted-foreground">Photo name:</span>
            <span className="text-sm text-muted-foreground">0.pdf</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDataBox;
