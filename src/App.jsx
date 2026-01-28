import Navbar from "./components/Navbar";
import Bottombar from "./components/Bottombar";
import CenterStuff from "./components/CenterStuff";
import MobileBlock from "./components/MobileBlock";

const App = () => {
    const isMobile = window.innerWidth < 1024;
    return (
        <>
        {isMobile && <MobileBlock />}

      {!isMobile && (
        <div className='main relative h-screen w-full px-16 py-10 flex flex-col justify-between text-[#111] bg-[url("/images/bg.png")] bg-cover bg-center bg-no-repeat overflow-hidden font-[manrope]'>
            <Navbar />
            <CenterStuff />
            <Bottombar />
        </div>
        )}
        </>
    );
};

export default App;
