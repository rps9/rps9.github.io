import Header from '../components/Header';
import Slideshow from '../components/Slideshow'

export default function AboutMe() {
    return (
    <>
    <Header />
        <section className="min-h-screen flex flex-col items-center relative px-4 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold text-white mt-6 mb-6">
                    About <span className="text-blue-400">Me</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    I'm a Computer Engineering student who has a passion for coding and machine learning. I enjoy automating certain things in my life and hosting as many things as I can for free. I am always diving into new projects, trying to learn as much as I can.
                </p>
                <p className="text-lg md:text-xl text-gray-400 mt-6">
                    Outside of school and work, I like to play basketball, travel, and try new things. 
                </p>
            </div>
            <div className="w-full">
                <Slideshow
                    slides={[
                        { src: "../assets/images/biwa.png", caption: "Me at Lake Biwa" },
                        { src: "../assets/images/biwa_boats.png", caption: "Lake Biwa Boats" },
                        { src: "../assets/images/vermont.png", caption: "Quechee, Vermont" },
                        { src: "../assets/images/wini.png", caption: "Lake Winnipesaukee" }
                    ]}
                />
            </div>
        </section>
    </>
    );
}