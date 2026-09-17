import { useState } from "react";
import Aside from "./AsideCallCenter"; 
import Header from "./HeaderCallCenter"; 

const CallCenterLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        const saved = localStorage.getItem('sidebarOpen')
        return saved !== null ? JSON.parse(saved) : true
    });

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => {
            const next = !prev
            localStorage.setItem('sidebarOpen', JSON.stringify(next))
            return next
        });
    };

    return (
        <div className="bg-[#f4f4f4] relative min-h-screen min-w-[1280px] flex flex-col">
            <div className="relative flex flex-col z-40">
                <Aside isOpen={isSidebarOpen} />
            </div>

            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

            <main className={`flex-1 mt-28 fade-main mr-10 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-[300px]' : 'ml-8'}`}>
                
                <div className="w-full">
                    {children}
                </div>
                
            </main>
        </div>
    );
};

export default CallCenterLayout;