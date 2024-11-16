import { ArrowRight, InstagramLogo, PinterestLogo, TwitterLogo } from '@phosphor-icons/react'
import React from 'react'

export const Footer = () => {
  return (
<section className='bg-[#1B1D22] flex flex-col md:flex-row justify-center items-center gap-5 p-5'>
  <div className='flex flex-col md:flex-row text-white w-full md:w-[80%]'>
    <div className="md:w-[40%] flex flex-col gap-7 mb-5 md:mb-0">
      <h1 className='text-3xl'>TIMES</h1>
      <p className='text-sm text-gray-500 w-full md:w-[70%]'>When it came near enough he perceived that it was not grass; there were no blades, but only purple roots the roots.</p>
      <p>© 2020 TIMES. All Rights Reserved</p>
    </div>
    <div className="flex flex-col md:flex-row w-full md:w-[60%] gap-5 md:gap-10">
      <ul className='flex flex-col gap-4 text-[#9A836C]'>
        <h1 className='text-xl'>Site Map</h1>
        <li className='text-sm text-gray-500'>Home</li>
        <li className='text-sm text-gray-500'>Product</li>
        <li className='text-sm text-gray-500'>About</li>
        <li className='text-sm text-gray-500'>Blog</li>
      </ul>
      <ul className='flex flex-col gap-4 text-[#9A836C]'>
        <h1 className='text-xl'>Contact</h1>
        <li className='text-sm flex text-gray-500'>Email: <p className='text-[#9A836C]'>times@gmail.com</p></li>
        <li className='text-sm flex text-gray-500'>Phone: <p className='text-[#9A836C]'>+880 1000 0000</p></li>
        <li className='flex gap-2'><InstagramLogo size={32} /> <TwitterLogo size={32} /> <PinterestLogo size={32} /></li>
      </ul>
      <ul className='flex flex-col gap-4 text-[#9A836C]'>
        <h1 className='text-xl'>Subscribe Newsletter</h1>
        <li className='text-sm flex text-gray-500'>What looked like a small patch of purple.</li>
        <form action="" className='flex'>
          <input type="email" id='ff' className='bg-[#1B1D15] p-2 w-full md:w-auto' placeholder='Enter Your Email' />
          <label className='gap-2 bg-[#9A836C] p-2 text-white' htmlFor="ff"><ArrowRight /></label>
        </form>
      </ul>
    </div>
  </div>
</section>

  )
}
