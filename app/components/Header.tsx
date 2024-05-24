"use client"
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";


interface HeaderProps {
    children: React.ReactNode,
    className?: string
}

const Header: React.FC<HeaderProps> = ({ children }) => {

    const router = useRouter()
    const handleLogIn = () => {
        //handleLogin
    }

    const handleLogOut = () => {
        //handleLogOut
    }

    const handleSignUp = () => {
        //handleSignUp
    }
    return (
        <header className="flex justify-between items-center p-5 bg-neutral-800">
            <div className="flex flex-row gap-2">
                <button className="bg-gray-200 rounded-2xl hover:bg-gray-300 duration-200">
                    <RxCaretLeft size={30} />
                </button>
                <button className="bg-gray-200 rounded-2xl hover:bg-gray-300 duration-200">
                    <RxCaretRight size={30} />
                </button>
            </div>
            <span>
                <button className="mr-4 px-7 py-3 rounded-md font-bold text-white">Sign Up</button>
                <button className="mr-4 px-7 py-3 bg-gray-100 rounded-3xl font-bold hover:bg-gray-300 duration-300">Log In</button>
            </span>
        </header>
    );
};

export default Header;