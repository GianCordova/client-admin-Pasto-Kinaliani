import imgLogo from "../../../assets/img/pastor_kinaliani.png";
import { AvatarUser } from "../ui/AvatarUser";

export const Navbar = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <img
                        src={imgLogo}
                        alt="Restaurante Logo"
                        className="h-8 md:h-10 w-auto object-contain"
                    />

                    <h1 className="font-bold text-orange-600 text-lg">
                        Restaurante Admin
                    </h1>
                </div>

                <AvatarUser />
            </div>
        </nav>
    );
};