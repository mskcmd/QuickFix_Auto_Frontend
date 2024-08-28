import image1 from "../../../public/Service/1.png";
import image2 from "../../../public/Service/10.png";
import image3 from "../../../public/Service/4.png";
import image4 from "../../../public/Service/5.png";
import image5 from "../../../public/Service/Car-Inspection.png"
import image6 from "../../../public/Service/liveguard-battery-140 (1).png";
import image7 from "../../../public/Service/8.png";
import image8 from "../../../public/Service/5.png";

const images = [image1, image2, image3,image4,image6, image7, image8,image5,image6, image7, image8,image5];


function Servicse() {
  return (
<div className='bg-white h-[607px] w-full flex justify-center items-center'>
    <div className='bg-white w-[130vh] rounded-2xl drop-shadow-2xl  flex flex-wrap'>
      {images.map((image, index) => (
        <div key={index} className='w-[25%]  p-4'>
          <div className="bg-white rounded-2xl drop-shadow-2xl "><img src={image} alt={`Image ${index + 1}`} className='rounded-xl' /></div>
        </div>
      ))}
    </div>
  </div>  )
}

export default Servicse