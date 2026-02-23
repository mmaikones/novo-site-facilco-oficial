import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AISegmentSelector from '../components/AISegmentSelector';
import Catalog from '../components/Catalog';
import About from '../components/About';
import WhereWeAre from '../components/WhereWeAre';
import ChatWidget from '../components/ChatWidget';

const Home: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="min-h-screen">
            <Header toggleChat={toggleChat} />
            <div className="relative">
                <Hero />
                <div className="relative z-20 -mt-32 md:-mt-36 lg:-mt-40 pb-16">
                    <AISegmentSelector />
                </div>
            </div>
            <Catalog />
            <About />
            <WhereWeAre />
            <footer className="bg-brand-dark border-t border-white/10 py-6 text-center">
                <p className="text-xs text-gray-400">&copy; 2026 Facilco Engenharia. Todos os direitos reservados.</p>
            </footer>
            <ChatWidget isOpen={isChatOpen} toggleChat={toggleChat} />
        </div>
    );
};

export default Home;
