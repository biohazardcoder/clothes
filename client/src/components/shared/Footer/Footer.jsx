import {
  ArrowRight,
  InstagramLogo,
  PinterestLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../Container/Container";

export const Footer = () => {
  return (
    <section className="bg-zinc-800 text-white">
      <Container
        className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20 gap-5"}
      >
        <div className="flex flex-col gap-7 mb-5 md:mb-0">
          <Link className={`text-3xl px-2`}>
            <img
              className="w-[80px]"
              src="https://cdn.freebiesupply.com/logos/large/2x/rolex-1-logo-black-and-white.png"
              alt="Logo"
            />
          </Link>
          <p className="text-sm opacity-50 font-extralight w-full md:w-[70%]">
            When it came near enough he perceived that it was not grass; there
            were no blades, but only purple roots the roots.
          </p>
          <p className="opacity-70">
            © {new Date().getFullYear()} Watchs.
            <span className="opacity-60 font-extralight">
              All Rights Reserved
            </span>
          </p>
        </div>
        <ul className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Contact</h1>
          <li className="text-md flex items-center gap-1">
            <span> Email:</span>
            <span className="text-[#9A836C]">times@gmail.com</span>
          </li>
          <li className="text-md flex items-center gap-1">
            <span> Phone:</span>
            <a href="tel: +998901234567">
              <span className="text-[#9A836C]">+998 (90) 123 45 67</span>
            </a>
          </li>
          <li className="flex gap-2 text-[#9A836C]">
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
