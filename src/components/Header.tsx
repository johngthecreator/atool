export default function Header(){
    return(
        <div className="bg-black p-4 text-white">
            <span className="flex items-center gap-2">
                <img className="w-[50px] h-[50px] rounded-[50px]" src="./headshots-logo.png" />
                <h1 className="font-bold text-2xl">HeadShots</h1>
            </span>
        </div>
    )
}