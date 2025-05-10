import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdComputer } from "react-icons/md";
import FooterImg from "../../assets/footer.jpg";
import { div } from "framer-motion/client";

const FooterBg = {
  backgroundImage: `url(${FooterImg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "bottom center",
};

const Footer = () => {
  return (
    <div style={FooterBg} className="rounded-t-3xl">
      <div className="bg-primary/5">
      <div className="container">
        <div className="grid md:grid-cols-4 md:gap-4 py-5 border-t-2 border-gray-300/10 text-black ">
          {/* brand info section */}
          <div>
            <div className="text-2xl flex items-center gap-2 font-bold">
              <MdComputer className="text-4xl text-secondary" />
              <p>E-Tutor</p>
            </div>
            <p className="text-sm mt-3 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              optio veniam nisi nesciunt ex magni facilis doloribus corporis
              beatae dolor? Enim, ratione.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-10 lg:gap-5 !mt-6 ">
              <a href="#" className="hover:text-secondary duration-200">
                <HiLocationMarker className="text-3xl" />
              </a>
              <a href="#" className="hover:text-secondary duration-200">
                <FaFacebookF className="text-3xl" />
              </a>
              <a href="#" className="hover:text-secondary duration-200">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="#" className="hover:text-secondary duration-200">
                <FaTwitter className="text-3xl" />
              </a>
            </div>
          </div>

          {/* footer links 1 */}
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 md:ml-14 mt-5">
            <div className="py-4 px-4">
              <h1 className="sm:text-xl text-xl font-semibold sm:text-left text-justify mb-5">
                Important Links
              </h1>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#" className="hover:text-secondary duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary duration-200">
                    Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary duration-200">
                    Login
                  </a>
                </li>
              </ul>
            </div>

            {/* footer links 2 */}
            <div className="py-4 px-4">
              <h1 className="sm:text-xl text-xl font-semibold sm:text-left text-justify mb-5">
                Company Links
              </h1>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#" className="hover:text-secondary duration-200">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary duration-200">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary duration-200">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* footer links 3 */}
            <div className="py-4 px-4">
              <h1 className="sm:text-xl text-xl font-semibold sm:text-left text-justify mb-5">
                Resources
              </h1>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#" className="hover:text-secondary duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary duration-200">
                    Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary duration-200">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* copyright section */}
        <div className="mt-8">
          <div className="text-center py-6 border-t-2 border-gray-800/20">
            <span className="text-sm text-black/60 ">
              {" "}
              ©copyright 2024 E-Tutor. All rights reserved
            </span>
          </div>
        </div>
      </div>
      </div>
     
    </div>
  );
};

export default Footer;
