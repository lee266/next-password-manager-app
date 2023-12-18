type StaticNumberButtonProps = {
  children: React.ReactNode;
};

const StaticNumberButton = ({ children }: StaticNumberButtonProps) => {
  return (
    <button
      aria-label="Static button"
      disabled
      className="
      text-black dark:text-white
        col-span-1 min-w-[56px]
        bg-gray-200 hover:bg-gray-300 
        rounded-lg p-2 text-xl font-bold
        dark:bg-gray-600 dark:hover:bg-gray-800
      "
    >
      {children}
    </button>
  );
};

export default StaticNumberButton;
