const Wrapper = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-sm shadow-md bg-background-500 p-2">
      {children}
    </div>
  );
};

export default Wrapper;
