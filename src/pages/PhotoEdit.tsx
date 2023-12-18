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
const [color, ] = useState<string>("bg-[#222]");
const [imgURL, setImgURL] = useState<string>("");
const [downloadURL, setDownloadURL] = useState<string>("");
const [isLoading, setIsLoading] = useState<boolean|null>(null);
const elementRef = useRef<HTMLImageElement>(null);
ring.register()

// const colorButtons = [
//     "bg-[url('/abhishek-tiwari.webp')]",
//     "bg-[url('/alexander-ant.webp')]",
//     "bg-[url('/andrey-k.webp')]",
//     "bg-[url('/don-kaveen.webp')]",
//     "bg-[url('/eugene-golovesov1.webp')]",
//     "bg-[url('/eugene-golovesov2.webp')]",
//     "bg-[url('/eugene-golovesov3.webp')]",
//     "bg-[url('/eugene-golovesov4.webp')]",
//     "bg-[url('/francesco-ungaro.webp')]",
//     "bg-[url('/laura-vinck.webp')]",
//     "bg-[url('/limi-change.webp')]",
//     "bg-[url('/omid-armin.webp')]",
//     "bg-[url('/pawel-czerwinski.webp')]",
//     "bg-[url('/weiye-tan.webp')]",
//     "bg-[url('/yared-lopez.webp')]",
// ]

useEffect(()=>{
    downloadHeadshots();
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
        setIsLoading(false);
        alert("Something went wrong! Please try again.")
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
    <div className="h-full flex items-center justify-center">
        <h1 className="block lg:hidden font-black text-3xl">We're not on mobile yet :/</h1>
        <div className="h-[504px] w-full hidden lg:flex flex-row max-w-[1800px] overflow-hidden pl-24 gap-5">
            <div className="h-full max-w-[1500px] flex flex-wrap flex-col gap-5">
                <div className="flex flex-row gap-5">
                    <div className="bg-purple-400 h-[200px] w-[200px] flex flex-col items-center justify-center rounded-3xl">
                        <h1 className="text-[60px] text-white font-black">ogle.</h1>
                    </div>
                    <div className="flex flex-wrap justify-between w-[200px]">
                        <div className="bg-red-400 h-[200px] w-[90px] rounded-3xl">

                        </div>
                        <div className="bg-orange-400 h-[200px] w-[90px] rounded-3xl">

                        </div>
                    </div>
                </div>
                {/* file upload */}
                <div className="flex flex-row gap-5">
                    <input 
                        className="p-5 bg-black border-2 rounded-3xl w-[200px] h-[200px]" 
                        onChange={(e:any)=>{
                            setImg({data:e.target.files[0], fileName:e.target.files[0].name})
                        }}

                        id="file-upload" 
                        type="file" 
                    />
                    <button 
                    className="bg-green-400 w-[200px] h-[200px] rounded-3xl text-white"
                    onClick={()=>cleanImg()}
                    type="button"
                    >
                    Clean Image
                    </button>

                </div>

                {/* url upload */}
                <input 
                className="p-5 bg-pink-400 text-black placeholder-white placeholder-bold rounded-3xl w-[420px]"
                type="text"
                placeholder="Upload from URL"
                onChange={(e)=>setImg({data:e.target.value, fileName:e.target.value})}
                >
                </input>
            </div>
            {/* <div>
                <div className="">
                    <h2 className="text-orange-950 text-xl font-bold">Pick Your Background</h2>
                    <div className="grid grid-cols-5 items-center gap-5">
                        {colorButtons.map((color)=>{
                            let buttonStyling = color + " rounded-[100px] w-[50px] h-[50px] border-solid border-white focus:border-2"
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
            </div> */}


            <div className="w-[420px] h-[504px] bg-blue-400 rounded-3xl">
                {isLoading ? (
                    <div className="flex items-center justify-center rounded-xl overflow-hidden w-[420px] h-[504px]"> 
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
                    <div className="flex w-[420px] h-full items-center justify-center">
                        <img ref={elementRef} src={"https://scontent-den4-1.xx.fbcdn.net/v/t45.5328-4/409219615_6944147215673395_9133437556305921309_n.jpg?stp=dst-jpg_s960x960&_nc_cat=104&ccb=1-7&_nc_sid=247b10&_nc_ohc=EJYbg5lP7KEAX_74A0o&_nc_ht=scontent-den4-1.xx&oh=00_AfAYIYXmsoqIq7s864q8iKr20dLcmEDIFNdGK5CaRXOj_w&oe=658612DA"} className="w-2/3 h-auto rounded-3xl" />
                    </div>
                )
                }
            </div>
            <div className="bg-yellow-400 w-screen h-[504px] rounded-l-3xl">
                {(downloadURL.length > 6) ? (
                    <a className="bg-[#222] hover:bg-gray-700 text-white p-3 rounded-lg font-bold text-center mb-5" href={downloadURL} download={img?.fileName.split(".")[0]+".png"} >Download Image</a>
                ):(
                    <p></p>
                )}

            </div>
        </div>

    </div>


)

}