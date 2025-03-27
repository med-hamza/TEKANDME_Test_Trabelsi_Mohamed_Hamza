export default function LogoCircle() {
    return (
        <div className="relative w-14 h-14 lg:w-20  lg:h-20">
            <div className="absolute  w-14 h-14 lg:w-20  lg:h-20 rounded-full bg-skin-light -top-2 -left-3 z-0" />
            <div className="absolute w-14 h-14 lg:w-20  lg:h-20 rounded-full bg-skin-accent z-10 flex items-center justify-center">
                <span className="text-4xl lg:text-6xl font-island text-black font-light">T</span>
            </div>
        </div>
    );
}
