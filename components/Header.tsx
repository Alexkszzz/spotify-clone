"use client"
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUser } from "react-icons/fa6";
import toast from "react-hot-toast";

interface HeaderProps {
    children: React.ReactNode,
    className?: string
}

const Header: React.FC<HeaderProps> = ({ children }) => {

    const authModal = useAuthModal()
    const supabaseClient = useSupabaseClient()
    const { user } = useUser()

    const router = useRouter()
    const handleLogIn = () => {
        //handleLogin
    }

    const handleLogOut = async () => {
        const { error } = await supabaseClient.auth.signOut()
        router.refresh()
        // TODO: reset any songs

        if (error) {
            toast.error(error.message)
        }
        else {
            toast.success("Logged Out Successfully!")
        }
    }

    const handleSignUp = () => {
        //handleSignUp
    }
    return (
        <header className="flex justify-between items-center p-5 bg-neutral-800">
            <div className="flex flex-row gap-2">
                <button className="bg-gray-200 rounded-2xl hover:bg-gray-300 duration-200" >
                    <RxCaretLeft size={30} />
                </button>
                <button className="bg-gray-200 rounded-2xl hover:bg-gray-300 duration-200">
                    <RxCaretRight size={30} />
                </button>
            </div>

            {
                user ?
                    (<span>
                        <button className="mr-4 px-7 py-3 bg-gray-100 rounded-3xl font-bold hover:bg-gray-300 duration-300" onClick={handleLogOut}>Log Out</button>
                        <button className="bg-green-500 hover:bg-green-600 duration-300 rounded-full p-[13px]" onClick={() => router.push('/account')}><FaUser /></button>
                    </span>) :
                    (<span>
                        <button className="mr-4 px-7 py-3 rounded-md font-bold text-white" onClick={authModal.onOpen}>Sign Up</button>
                        <button className="mr-4 px-7 py-3 bg-gray-100 rounded-3xl font-bold hover:bg-gray-300 duration-300" onClick={authModal.onOpen}>Log In</button>
                    </span>)
            }

        </header >
    );
};

export default Header;