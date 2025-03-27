// components/Footer.tsx

import LogoCircle from "../logo/LogoCircle";
import SocialIcons from "../logo/SocialIcons";


export default function Footer() {
    return (
        <footer className="bg-skin-base border-t border-skin-border px-6 py-4 mt-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center  gap-4">
                    <div className="bg-skin-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                        <LogoCircle />
                    </div>
                    <span className="font-island lg:text-8xl text-4xl italic">Todo List</span>
                </div>
                <p className="text-sm text-[#0A142F] font-normal text-center md:text-left">
                    © 2024 Tekandme. All Rights Reserved.
                </p>
                <SocialIcons />
            </div>
        </footer>
    );
}
