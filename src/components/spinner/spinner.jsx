import { PulseLoader } from "react-spinners";


const Spinner = ({ smallHeight }) => {
    return (
      <div
        className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
                flex 
                flex-col 
                justify-center 
                items-center `}
      >
        <PulseLoader
          size={30} color='#1C3CDC' />
      </div>
    )
  
  };
  
  export default Spinner;