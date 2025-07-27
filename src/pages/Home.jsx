import { Link } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
    return (
        <>
            <Header />
            <section className="lg:py-24 py-12 bg-gradient-to-b from-[#1a1a1a] to-[#111] text-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left: Text Content */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                                Your Ultimate
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
                                    Movie Collection
                                </span>
                                Awaits
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                                Discover, organize, and rate your favorite movies in one beautiful place. Dive into the world of cinema like never before.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                                <Link to={"/add-movie"} className="bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-2xl text-lg font-semibold shadow-md shadow-orange-500/40 transition duration-300">
                                    Start Collecting
                                </Link>
                                <Link to={"/dashboard"} className="border border-orange-500 text-orange-400 hover:bg-orange-600 hover:text-white px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300">
                                    Browse Movies
                                </Link>
                            </div>
                        </div>

                        {/* Right: Hero Image */}
                        <div className="lg:w-1/2 relative">
                            <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl shadow-lg w-full max-w-md mx-auto border border-white/10">
                                <img src="/addMovieBg.jpg" alt="" />
                            </div>
                            <div className="absolute bottom-4 right-6 bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md">
                                🎬 1000+ Movies
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Home;
