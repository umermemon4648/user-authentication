import React from 'react'
import img1 from '../../images/img1.png'
import img2 from '../../images/img2.png'
const Hero = () => {
  return (
    <>

{/* <link href="https://fonts.googleapis.com/css?family=Mitr|Roboto+Slab|Source+Sans+Pro&display=swap" rel="stylesheet">
<script src="https://premium-tailwindcomponents.netlify.app/assets/build/js/main.js?id=8c11b7cf78ebea1b5aed"></script> */}

<div className="bg-indigo-900 relative overflow-hidden">
    <div className="inset-0 bg-black opacity-25 absolute"></div>
    <header className="absolute top-0 left-0 right-0 z-20">
      
    </header>

    <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-24 xl:py-40">
        <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
            <span className="font-mitr uppercase text-indigo-500">Lorem ipsum</span>

            <h1 className="font-roboto-slab text-4xl sm:text-6xl text-red-400 leading-tight mt-4">Let's go <br/> back to school</h1>

            <div className="max-w-md">
                <p className="font-source-sans-pro text-indigo-500 mt-6 text-lg">Lorem ipsum dolor sit amet consectetur adipiscing elit tincidunt cras sociis, parturient enim montes.</p>
            </div>

            <a href="#" className="block bg-indigo-500 hover:bg-indigo-400 py-2 px-4 rounded-full text-sm font-mitr text-white uppercase mt-10">Get started</a>
        </div>

      {/* img2 */}
      <img src={img2} alt="img2" />
    </div>

      <img src={img1} alt="img1" />
   {/* img1 */}
</div>
    
    
    </>
  )
}

export default Hero