import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mic, Send, X, Sparkles, MessageSquare } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for class merging
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FacilcoPlasmaChatProps {
    children: React.ReactNode;
    onMessage: (text: string) => void;
    onSpeech: (transcript: string) => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

const KNOWLEDGE_BOOST_DB = [
    { pattern: /nr\s?12/i, response: "💡 **NR-12:** Segurança em Máquinas e Equipamentos." },
    { pattern: /nr\s?35/i, response: "💡 **NR-35:** Trabalho em Altura (Acima de 2m)." },
    { pattern: /nr\s?10/i, response: "💡 **NR-10:** Segurança em Instalações Elétricas." },
    { pattern: /laudo/i, response: "✨ **Tip:** Envie uma foto para pré-análise." },
];

const FacilcoPlasmaChat: React.FC<FacilcoPlasmaChatProps> = ({ children, onMessage, onSpeech, isOpen: externalIsOpen, onToggle }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isControlled = externalIsOpen !== undefined;
    const isOpen = isControlled ? externalIsOpen : internalIsOpen;

    const handleToggle = () => {
        if (onToggle) {
            onToggle();
        } else {
            setInternalIsOpen(!isOpen);
        }
    };

    // Auto-open on mount logic
    useEffect(() => {
        // Check if we've already auto-opened in this session to avoid annoyance
        const hasOpened = sessionStorage.getItem('facilco_chat_auto_opened');
        if (!hasOpened && !isOpen) {
            const timer = setTimeout(() => {
                if (onToggle) onToggle();
                else setInternalIsOpen(true);
                sessionStorage.setItem('facilco_chat_auto_opened', 'true');
            }, 1000); // 1.5s delay after load
            return () => clearTimeout(timer);
        }
    }, []);

    const [inputText, setInputText] = useState('');
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);

    // Knowledge Boost Logic
    useEffect(() => {
        const match = KNOWLEDGE_BOOST_DB.find(item => item.pattern.test(inputText));
        if (match) {
            setSuggestion(match.response);
        } else {
            setSuggestion(null);
        }
    }, [inputText]);

    const handleSend = () => {
        if (!inputText.trim()) return;
        onMessage(inputText);
        setInputText('');
        setSuggestion(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleMicClick = () => {
        setIsListening(true);
        setTimeout(() => {
            setIsListening(false);
            const mockTranscript = "Quais as exigências da NR12?";
            setInputText(mockTranscript);
            onSpeech(mockTranscript);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {/* Draggable Trigger Button (The Matrix Sphere) */}
            <AnimatePresence mode="wait">
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, x: 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="pointer-events-auto absolute bottom-8 right-6 sm:bottom-10 sm:right-10 z-50 rounded-full"
                    >
                        <button
                            onClick={handleToggle}
                            className="relative flex items-center justify-center rounded-full group outline-none cursor-pointer transition-transform duration-300"
                            aria-label="Chat IA"
                            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
                        >
                            <img
                                src="/chat-orb.png"
                                alt="Chat IA"
                                className="object-contain rounded-full transition-transform duration-300"
                                style={{ width: 'min(128px, 25vw)', height: 'min(128px, 25vw)' }}
                            />
                            <div
                                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ boxShadow: '0 6px 20px rgba(212,175,55,0.3)' }}
                            />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Window Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="pointer-events-auto absolute inset-0 flex items-center justify-center sm:items-end sm:justify-end p-4 sm:p-6 transition-all z-50">
                        {/* Backdrop - Click to minimize */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleToggle}
                            className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-0"
                        />

                        {/* Glass Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40, x: 0 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40, x: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 350 }}
                            className="relative z-10 w-full max-w-[360px] sm:w-[360px] lg:w-[380px] h-[72vh] sm:h-[620px] max-h-[calc(100vh-72px)] rounded-[1.75rem] overflow-hidden shadow-2xl border border-white/80 bg-white/80 backdrop-blur-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="relative h-20 shrink-0 border-b border-orange-100/50 flex items-center justify-between px-6 bg-gradient-to-r from-orange-50/50 to-white/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white p-1 shadow-sm border border-orange-100 block shrink-0">
                                        <img src="/logo.png" alt="Facilco" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="text-sm font-bold text-slate-800 tracking-tight">Facilco Engenharia</h1>
                                        <span className="text-[10px] text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full w-fit flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            Online Agora
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleToggle}
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-100 text-slate-400 hover:text-orange-600 transition-colors"
                                        title="Minimizar"
                                    >
                                        <div className="w-3 h-0.5 bg-current rounded-full" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-hidden relative flex flex-col bg-white/40">
                                <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
                                    {children}
                                </div>
                            </div>

                            {/* Suggestion Popover */}
                            <AnimatePresence>
                                {suggestion && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className="absolute bottom-24 left-6 right-6 p-4 rounded-2xl bg-white border border-orange-100 shadow-xl shadow-orange-500/10 z-20 flex items-start gap-3"
                                    >
                                        <Sparkles className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-slate-600 leading-relaxed font-medium">{suggestion}</p>
                                            <button
                                                onClick={() => { setInputText(prev => prev + " " + suggestion); setSuggestion(null); }}
                                                className="mt-2 text-[10px] font-bold text-orange-500 uppercase tracking-wider hover:underline"
                                            >
                                                Inserir Contexto
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Input Area */}
                            <div className="p-5 pt-0 bg-transparent relative z-30">
                                <div className="bg-white border border-white rounded-[20px] p-2 pl-4 shadow-lg shadow-orange-900/5 flex items-center gap-2 transition-shadow focus-within:shadow-xl focus-within:ring-1 focus-within:ring-orange-200">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Digite sua dúvida..."
                                        className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 h-10"
                                    />

                                    <div className="flex items-center gap-1 pr-1">
                                        <button
                                            onClick={handleMicClick}
                                            className={cn(
                                                "w-8 h-8 flex items-center justify-center rounded-xl transition-all",
                                                isListening
                                                    ? "bg-red-50 text-red-500"
                                                    : "text-slate-400 hover:text-orange-500 hover:bg-orange-50"
                                            )}
                                        >
                                            <Mic className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={handleSend}
                                            disabled={!inputText.trim()}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                                        >
                                            <Send className="w-4 h-4 ml-0.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FacilcoPlasmaChat;
