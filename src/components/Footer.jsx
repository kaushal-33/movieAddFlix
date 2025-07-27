import { Link } from "react-router";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
    return (
        <footer className=" py-12 bg-gradient-to-b from-[#1a1a1a] to-[#111] border-t border-gray-700">
            <div className="container mx-auto px-5">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2">
                            <Link to={"/"}>
                                <img src="/LOGO.png" alt="LOGO" width={100} />
                            </Link>
                        </div>
                        <p className="text-gray-400">Your personal movie collection manager.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-orange-600">Features</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Movie Organization</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Rating System</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-orange-600">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-orange-600">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                                <FacebookIcon fontSize="small" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                                <InstagramIcon fontSize="small" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                                <TwitterIcon fontSize="small" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; 2025 Movieaddflix. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
