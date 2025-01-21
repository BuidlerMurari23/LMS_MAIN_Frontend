
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs"

function Footer(){

    const newDate = new Date();
    const year = newDate.getFullYear();

    return(
        <footer className="relative left-0 bottom-0 h-[10vh] py-5 sm:px-20 text-white bg-gray-800 flex flex-col sm:flex-row items-center justify-between ">
            {/* For the left side of the footer */}
            <section className="text-lg">
                Copyright {year} | All rights are reserved
            </section>
            {/* for the right side of the footer */}
            <section className="flex items-center justify-center gap-5 text-white text-2xl">
                <a href="#" className="hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    <BsFacebook />
                </a>
                <a href="#" className="hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    <BsTwitterX />
                </a>
                <a href="#" className="hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    <BsLinkedin />
                </a>
                <a href="#" className="hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    <BsInstagram />
                </a>
            </section>
        </footer>
    )

}

export default Footer;