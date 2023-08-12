
type NumberButtonType = {
  children: React.ReactNode;
  value: string;
  ariaLabel?: string;
  ButtonClick: (value:string) => void;
}

const NumberButton = (props:NumberButtonType) => {
  return(
    <button
      aria-label={props.ariaLabel}
      onClick={() => props.ButtonClick(props.value)} 
      className="
      text-black dark:text-white
        col-span-1
        min-w-[56px]
      bg-gray-200 hover:bg-gray-300 
        rounded-lg p-2 text-xl font-bold
      dark:bg-gray-600 dark:hover:bg-gray-800"
      >
      {props.children}
    </button>
  )
}

export default NumberButton;
