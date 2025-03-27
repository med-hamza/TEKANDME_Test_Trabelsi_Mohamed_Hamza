import Image from "next/image";
import LogoCircle from "../logo/LogoCircle";

export default function Header() {
    return (
        <header className="bg-skin-base border-t border-skin-border px-6 py-4 shadow-[0_4px_12.3px_rgba(0,0,0,0.2)]">
            <div className="max-w-6xl mx-auto flex flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3  lg:gap-16">
                    <div className="bg-skin-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                        <LogoCircle />
                    </div>
                    <span className="font-island lg:text-8xl text-4xl italic">Todo List</span>
                </div>
                <div className="">
                    <Image src='/images/profile.svg'
                        width={70}
                        height={70}
                        alt="profile" />
                </div>
            </div>
        </header>
    );
}
