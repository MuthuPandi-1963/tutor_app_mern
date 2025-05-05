import React from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../utility/animation";

const Banner = ({ image, title, subtitle, link, tag, reverse }) => {
  return (
    <div className="bg-[#f9f9f9] pb-14">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2  space-y-6 md:space-y-0 pb-8">
          {/* Banner Image Section */}
          <div className={`flex justify-center  ${reverse && "md:order-last"}`}>
            <motion.img
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              src={image}
              alt=""
              className="w-[400px] h-full object-cover "
            />
          </div>

          {/* Banner text Section */}
          <div className="flex flex-col text-center md:text-left space-y-4 lg:max-w-[600px] shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-primary/5 rounded-xl p-12">
            <motion.p
              variants={SlideUp(0.5)}
              initial="hidden"
              whileInView={"visible"}
              className="text-sm text-orange-600 font-semibold capitalize"
            >
              {tag}
            </motion.p>
            <motion.p
              variants={SlideUp(0.7)}
              initial="hidden"
              whileInView={"visible"}
              className="text-xl lg:text-2xl font-semibold capitalize "
            >
              {title}
            </motion.p>
            <motion.p
              variants={SlideUp(0.9)}
              initial="hidden"
              whileInView={"visible"}
              className="text-sm text-slate-500"
            >
              {subtitle}
            </motion.p>
            <motion.div
              variants={SlideUp(1.1)}
              initial="hidden"
              whileInView={"visible"}
              className="flex justify-center md:justify-start"
            >
              <button className="primary-btn !mt-">Get Started</button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
