import imglyRemoveBackground from "@imgly/background-removal"
import html2canvas from "html2canvas";
import { useState, useRef, useEffect } from "react";
import {ring} from "ldrs"


// Default values shown

interface ImageData {
    data:ArrayBuffer | Uint8Array | Blob | URL | string,
    fileName: string 
}

export default function PhotoEdit(){
const [img, setImg] = useState<ImageData>();
const [color, setColor] = useState<string>("bg-[#222]");
const [imgURL, setImgURL] = useState<string>("");
const [downloadURL, setDownloadURL] = useState<string>("");
const [isLoading, setIsLoading] = useState<boolean|null>(null);
const elementRef = useRef<HTMLImageElement>(null);
ring.register()

const colorButtons = [
    "bg-[#222]",
    "bg-[#B29E7B]",
    "bg-cyan-500",
    "bg-[#6F9CEB]",
    "bg-gradient-to-br from-purple-500 to-pink-500",
    "bg-[#F49F0A]",
    "bg-[#F49F0A]",
    "bg-[#F49F0A]",
    "bg-gradient-to-br from-cyan-500 to-blue-500",
]

useEffect(()=>{
    downloadHeadshots();
    console.log(downloadURL.length)
},[imgURL, color])

const cleanImg = () => {
    if(!img) return;
    try{
        setIsLoading(true);
        imglyRemoveBackground(img.data).then((blob: Blob) => {
            const url = URL.createObjectURL(blob);
            setImgURL(url);
            setIsLoading(false);
        })
    }catch (e){
        console.error(e);
    }
}

const downloadHeadshots = async () => {
    const element = elementRef.current;
    if(element){
        let canvas = await html2canvas(element);
        let data = canvas.toDataURL('image/jpg')
        setDownloadURL(data);
    }
};

return(
    <div className="flex flex-col">
        <div className="bg-black p-4 text-white">
            <h1 className="font-bold text-2xl">HeadShots.XYZ</h1>
        </div>
        <div className="h-screen flex flex-col md:flex-row items-center overflow-y-scroll">
            <div className="flex flex-col w-full md:w-[500px] h-full bg-[#3C3C3C] p-5 gap-5">
                <h2 className="text-white text-xl font-bold">Upload a Picture</h2>
                <input 
                    className="p-5 bg-white border-2 rounded-xl" 
                    onChange={(e:any)=>{
                        setImg({data:e.target.files[0], fileName:e.target.files[0].name})
                    }}

                    id="file-upload" 
                    type="file" 
                />
                <h2 className="text-white text-xl font-bold">Pick Your Background</h2>
                <div className="grid grid-cols-5 items-center gap-5">
                    {colorButtons.map((color)=>{
                        const buttonStyling = color + " rounded-[100px] w-[50px] h-[50px]"
                        return(
                            <button 
                            onClick={()=>setColor(color)}
                            className={buttonStyling}>
                            </button>

                        )
                    })}
                </div>
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={()=>cleanImg()}
                type="button"
                >
                Submit
                </button>
            </div>

            <div className="w-full flex items-center justify-center">
                {isLoading ? (
                    <div className="flex items-center justify-center rounded-xl overflow-hidden w-[300px] h-[400px]"> 
                        <div className="text-center">
                            <l-ring
                            size="40"
                            stroke="5"
                            bg-opacity="0"
                            speed="2" 
                            color="black" 
                            ></l-ring>
                            <h1>Processing Image...</h1>
                        </div>
                    </div>
                ):(
                    <div className="flex flex-col">
                        <div className="rounded-xl overflow-hidden max-w-[300px] my-5">
                            <img ref={elementRef} src={imgURL} className={color} />
                        </div>
                            {(downloadURL.length > 6) ? (
                                <a className="bg-[#222] hover:bg-gray-700 text-white p-3 rounded-lg font-bold text-center mb-5" href={downloadURL} download={img?.fileName.split(".")[0]+".png"} >Download Image</a>
                            ):(
                                <p></p>
                            )}
                    </div>
                )
                }
            </div>
        </div>

    </div>

)

}