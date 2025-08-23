import { useEffect, useState } from "react";
import { IKImage } from "imagekitio-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Image = ({ 
        path, 
        paths=[],
        className, 
        w, 
        h, 
        lazy = true, 
        alt = "default", 
        isCarousel = false
    }) => {
    const [current, setCurrent] = useState(0);
    const [images, setImages] = useState([]);
    useEffect(()=>
    {
        if (paths && paths.length > 0) 
        {
            const filtered = paths.filter(p => p!=="" && p);
            setImages(filtered);
        }
    },paths)

    if (isCarousel && images && images.length > 0) {
        const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
        const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

        return (
        <div className="relative w-full overflow-hidden">
            <IKImage
                key={current}
                urlEndpoint="https://ik.imagekit.io/zvk2bqqlk/"
                path={images[current]}
                alt={alt}
                className={`${className} transition-all duration-500`}
                loading={lazy ? "lazy" : ""}
                lqip={{ active: true, quality: 70 }}
                width={w}
                height={h}
                transformation={[{ width: w, height: h, focus: "center" }]}/>

            {images.length > 1 && (
            <>
                <button onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow">
                    <FaArrowLeft />
                </button>
                <button onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow">
                    <FaArrowRight />
                </button>
            </>
            )}

            {images.length > 1 && (
            <div className="absolute bottom-3 w-full flex justify-center gap-2">
                {images.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full cursor-pointer ${i === current ? "bg-blue-500" : "bg-gray-300"}`}
                    onClick={() => setCurrent(i)} />
                ))}
            </div>
            )}
        </div>
        );
    }

    return (
        <IKImage
            urlEndpoint="https://ik.imagekit.io/zvk2bqqlk/"
            path={path}
            alt={alt}
            className={className}
            loading={lazy ? "lazy" : ""}
            lqip={{ active: true, quality: 70 }}
            width={w}
            height={h}
            transformation={[{ width: w, height: h, focus: "center" }]}/>
    );
};

export default Image;
