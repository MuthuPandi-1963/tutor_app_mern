import { delay } from "framer-motion";
import { div, s, text } from "framer-motion/client";
import React from "react";
import Slider from "react-slick";

const TestimonialsData = [
  {
    id: 1,
    name: "John doe",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    img: "https://i.pravatar.cc/150?img=3",
    delay: 0.2,
  },
  {
    id: 2,
    name: "Steve Smith",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    img: "https://i.pravatar.cc/150?img=4",
    delay: 0.5,
  },
  {
    id: 3,
    name: "Kristen",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    img: "https://i.pravatar.cc/150?img=5",
    delay: 0.8,
  },
  {
    id: 4,
    name: "Paul",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    img: "https://i.pravatar.cc/150?img=8",
    delay: 1.1,
  },
];

const Testimonial = () => {
  const setting = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mb-10 py-5">
      <div className="container">
        {/* header section */}
        <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-6">
          <h1 className="uppercase font-semibold text-orange-600">
            Our Testimonials
          </h1>
          <p className="font-semibold text-3xl">
            What Our Students Say About Us
          </p>
        </div>

        {/* cards section */}
        <div>
          <Slider {...setting}>
            {TestimonialsData.map((item, index) => {
              return (
                <div key={item.id}>
                  <div className="flex flex-col gap-4 p-8 shadow-lg mx-4 rounded-xl bg-secondary/10">
                    {/* upper section */}
                    <div className="flex justify-start items-center gap-5">
                      <img
                        src={item.img}
                        alt=""
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <p className="text-xl font-semibold text-black/80">
                          {item.name}
                        </p>
                        <p>{item.name}</p>
                      </div>
                    </div>

                    {/* bottom section  */}
                    <div className="py-6 space-y-4">
                      <p className="text-sm text-gray-500">{item.text}</p>
                      <p className="">⭐⭐⭐⭐⭐</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
