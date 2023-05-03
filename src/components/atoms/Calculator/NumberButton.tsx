
type NumberButtonType = {
  children: React.ReactNode;
  value: string;
  ButtonClick: (value:string) => void;
}

const NumberButton = (props:NumberButtonType) => {
  return(
    <button
      onClick={() => props.ButtonClick(props.value)} 
      className="
        col-span-1
        min-w-[56px]
      bg-gray-200 hover:bg-gray-300 
        rounded-lg p-2 text-xl font-bold">
      {props.children}
    </button>
  )
}

export default NumberButton;
