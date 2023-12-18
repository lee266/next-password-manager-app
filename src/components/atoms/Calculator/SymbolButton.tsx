type SymbolValue = '+' | '-' | '*' | '/';

type SymbolButtonType = {
  children: React.ReactNode;
  value: SymbolValue;
  ariaLabel?: string;
  ButtonClick: (value: SymbolValue) => void;
};

const SymbolButton = (props: SymbolButtonType) => {
  return (
    <button
      aria-label={props.ariaLabel}
      onClick={() => props.ButtonClick(props.value)}
      className="
      text-black dark:text-white
        col-span-1
        min-w-[56px]
      bg-gray-200 hover:bg-gray-300 
        rounded-lg p-2 text-xl font-bold
        dark:bg-gray-600 dark:hover:bg-gray-800
      "
    >
      {props.children}
    </button>
  );
};

export default SymbolButton;
