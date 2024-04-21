import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default function DateController() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <IoIosArrowBack
        size={20}
        className="p-1 box-content hover:bg-slate-100 rounded cursor-pointer"
      />
      <h2 className="text-lg">Março de 2024</h2>
      <IoIosArrowForward
        size={20}
        className=" box-content hover:bg-slate-100 cursor-pointer rounded p-1"
      />
    </div>
  )
}
