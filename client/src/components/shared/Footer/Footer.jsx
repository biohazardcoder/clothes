import {
  InstagramLogo,
  PinterestLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import React from "react";
import { Container } from "../Container/Container";

export const Footer = () => {
  return (
    <section className="bg-mainBg text-primary">
      <Container
        className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20 gap-5"}
      >
        <div className="flex flex-col text-primary gap-7 mb-5 md:mb-0">
          <p className="text-mainText text-sm opacity-60 font-extralight  w-full md:w-[70%]">
            When it came near enough he perceived that it was not grass; there
            were no blades, but only purple roots the roots.
          </p>
          <p className=" text-mainText">
            © {new Date().getFullYear()} Watchs. {" "}
            <span className="">
              All Rights Reserved
            </span>
          </p>
        </div>
        <ul className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-mainText">Contact</h1>
          <li className="text-md flex items-center gap-1">
            <span className="text-mainText"> Email:</span>
            <span className="text-highlight">times@gmail.com</span>
          </li>
          <li className="text-md flex items-center gap-1">
            <span className="text-mainText"> Phone:</span>
            <a href="tel: +998901234567">
              <span className="text-highlight">+998 (90) 123 45 67</span>
            </a>
          </li>
          <li className="flex gap-2 text-highlight">
            <InstagramLogo size={32} /> <TwitterLogo size={32} />
            <PinterestLogo size={32} />
          </li>
        </ul>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d532.3092911645143!2d71.64486484690147!3d40.99908139508204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4be9b6cd3cbd%3A0xded218176aa9ba8a!2z0KXRg9C80L4sIFItMTEyLCDQndCw0LzQsNC90LPQsNC9LCDQndCw0LzQsNC90LPQsNC90YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsINCj0LfQsdC10LrQuNGB0YLQsNC9!5e0!3m2!1sru!2s!4v1731767548921!5m2!1sru!2s"
          width="100%"
          height="250"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Container>
    </section>
  );
};
