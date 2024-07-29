import Image from "next/image"
import arrowLeft from '@/public/svg/arrow-left-green.svg'
import CreatedListItem from "./CreatedListItem"


export default function CreatedList( {createdList, setProductModal} ) {
  return (
    <div className='w-[500px] h-full relative flex flex-col'>
      <div className='h-screen w-[380px] fixed inset-0 bg-snowy flex flex-col justify-between overflow-y-scroll no-scrollbar' >
        <div className='flex flex-col w-full py-6 px-3 gap-6'>
          <button onClick={()=> setProductModal(false)} className='text-greenView flex gap-2 hover:gap-3 transition-all duration-200 text-lg font-semibold items-center'>
            <Image
            src={arrowLeft}
            width={100}
            height={100}
            alt="Arrow Back Icon"
            className="w-4 h-4"
            />
            Back
          </button>
          <div className="w-full h-full flex flex-col gap-3 overflow-y-scroll no-scrollbar">
            {
              createdList.map((item) => (
                <div key={item.id}>
                  <CreatedListItem item={item} />
                </div>
              ))
            }
          </div>
        </div>
        <div className='w-full bg-white flex px-6 py-4 items-center justify-between gap-2'>
          <button className='py-3 flex items-center px-4 border rounded-xl text-greenView'>
            <p className='flex items-center gap-2'>
            Add product 
              <span className='text-2xl'>
            +

              </span>
            </p>
          </button>
          <button className='py-3 flex items-center px-12 border rounded-xl text-white bg-greenView'>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
