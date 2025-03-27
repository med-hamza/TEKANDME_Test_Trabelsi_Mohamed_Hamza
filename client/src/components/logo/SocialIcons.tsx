import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";

export default function SocialIcons() {
    const iconStyle = "w-4 h-4 text-black group-hover:text-skin-accent transition-colors";
    const wrapper = "w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-skin-base group";

    return (
        <div className="flex items-center gap-4">
            <a href="#" className={wrapper}><FaFacebookF className={iconStyle} /></a>
            <a href="#" className={wrapper}><FaLinkedinIn className={iconStyle} /></a>
            <a href="#" className={wrapper}><FaTwitter className={iconStyle} /></a>
            <a href="#" className={wrapper}><FaGithub className={iconStyle} /></a>
        </div>
    );
}
