const Header = () => {
    return (
        <header className="flex justify-between items-center p-5 bg-gray-700">
            <div>
                <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
            </div>
            <span>
                <button className="mr-4 px-7 py-3 rounded-md font-bold text-white">Sign Up</button>
                <button className="mr-4 px-7 py-3 bg-gray-100 rounded-3xl font-bold hover:bg-gray-300 duration-300">Log In</button>
            </span>
        </header>
    );
};

export default Header;