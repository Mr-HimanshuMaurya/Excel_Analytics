import Header from "./Header";

const LayoutSetter = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default LayoutSetter;
