// import React from 'react'
// import FadeLoader from "react-spinners/FadeLoader";
// const Loader = ({loading}) => {
//   return (
//     <div className='flex loading-div justify-center items-center w-screen h-screen bg-white'>


// <FadeLoader
//         color="#0000"
//         loading={loading}
//         size={250}
//         aria-label="Loading Spinner"
//         data-testid="loader"
//       />


//     </div>
//   )
// }

// export default Loader





import React from 'react'
import { Oval } from 'react-loader-spinner'
const Loader = () => {
  return (
    <div className='flex loading-div justify-center items-center w-screen h-screen bg-white'>


<Oval
  visible={true}
  height={300}
  width={300}
  ariaLabel='oval-loading'
  wrapperClass=""
  color="#2196F3"
  secondaryColor="#fafaf"
  strokeWidth={2}
  strokeWidthSecondary={2}


/>
    </div>
  )
}

export default Loader