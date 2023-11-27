import html2canvas from "html2canvas";
export default function Home(){
    const handleDownloadImage = async () => {
        const element = document.getElementById('print')
        if(!element)return;
        let canvas = await html2canvas(element);
        if(!canvas) return;
        let data = canvas.toDataURL('image/jpg')
        console.log(data);
      };
    return(
        <div>
            <h1>Home page</h1>
            <button onClick={()=>handleDownloadImage()}>Download</button>
            <div id="print" className="bg-red-400 p-4"> 
                <img src="./pk.png" />
            </div>
        </div>
    )
}