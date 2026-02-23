import React, { useState, useRef, useEffect } from 'react';
import { generateResponse } from '../services/geminiService';
import { Message } from '../types';
import FacilcoPlasmaChat from './FacilcoPlasmaChat';

interface ChatWidgetProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const STORAGE_KEY = 'facilco_chat_history';

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, toggleChat }) => {
  // Initialize messages from localStorage or default
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY);
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }

    return [
      {
        id: 'welcome',
        text: "Olá! Sou o assistente virtual da Facilco Engenharia. 🏗️\n\nPosso ajudar com:\n- Diagnóstico visual de danos (envie uma foto!)\n- Dúvidas sobre Normas (NRs)\n- Especificações de produtos\n\nComo posso ajudar sua obra hoje?",
        isUser: false,
        timestamp: Date.now()
      }
    ];
  });

  const [isTyping, setIsTyping] = useState(false);

  // Image State (kept for "Analyze Problem" button inside responses)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Save to localStorage whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.warn("Could not save chat history to localStorage:", error);
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle File Selection (Hidden input triggered by button in chat stream)
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        setImageMimeType(file.type);
        // Automatically send or prompt user? 
        // Original logic put it in "selectedImage" state and cleared input. 
        // Here we might want to immediately trigger a specialized message or just show preview.
        // For now, let's append a system message showing the preview and asking for prompt?
        // OR better: Just set it and when user types text, it sends it?
        // The new UI separates text input. 
        // Let's implement a simple "Image Ready" indicator in the message stream or just send it immediately with a default prompt if text is empty.

        // Strategy: Add a visible "User" message with the image immediately to confirm selection, 
        // then trigger the API call with "Analise esta imagem".
        handleSend("", base64String, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (text: string, imageOverride?: string, mimeOverride?: string) => {
    if (!text.trim() && !imageOverride && !selectedImage) return;

    const currentImage = imageOverride || selectedImage;
    const currentMime = mimeOverride || imageMimeType;
    const userText = text.trim() || (currentImage ? "Analise esta imagem." : "");

    // Create User Message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      isUser: true,
      timestamp: Date.now(),
      image: currentImage || undefined
    };

    setMessages(prev => [...prev, newMessage]);

    // Clear image state
    setSelectedImage(null);
    setImageMimeType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    setIsTyping(true);

    try {
      // Prepare Base64 for API (remove data:image/xxx;base64, prefix)
      let apiBase64: string | undefined = undefined;
      if (currentImage) {
        apiBase64 = currentImage.split(',')[1];
      }

      const responseText = await generateResponse(userText, apiBase64, currentMime || undefined);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, ocorreu um erro ao processar sua solicitação.",
        isUser: false,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSpeech = (transcript: string) => {
    handleSend(transcript);
  };

  // Function to generate and print PDF
  const generatePDF = (content: string, image?: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Clean up content for print (remove the whatsapp button link)
    const cleanContent = window.marked ? window.marked.parse(content) : content;
    const date = new Date().toLocaleDateString('pt-BR');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Laudo Técnico - Facilco</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; padding: 40px; }
          .header { text-align: center; border-bottom: 3px solid #FFB400; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #1A1A1A; }
          .logo span { color: #FFB400; }
          .meta { font-size: 12px; color: #666; margin-top: 10px; }
          .content { background: #fff; padding: 20px; border: 1px solid #eee; }
          .content h2 { color: #1A1A1A; border-bottom: 1px solid #FFB400; padding-bottom: 10px; display: inline-block; }
          .content strong { color: #000; }
          .footer { margin-top: 50px; font-size: 10px; text-align: center; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
          .warning { background: #fff3cd; color: #856404; padding: 10px; border: 1px solid #ffeeba; font-size: 11px; margin-top: 20px; }
          .image-evidence { text-align: center; margin: 20px 0; }
          .image-evidence img { max-width: 300px; border: 2px solid #FFB400; }
          @media print {
            body { -webkit-print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo"><i class="fas fa-industry"></i> FACILCO <span>ENGENHARIA</span></div>
          <div class="meta">Relatório Gerado em: ${date}</div>
        </div>

        ${image ? `
        <div class="image-evidence">
            <p style="font-size: 10px; font-weight: bold; text-transform: uppercase;">Evidência Fotográfica</p>
            <img src="${image}" alt="Evidência" />
        </div>
        ` : ''}

        <div class="content">
          ${cleanContent}
        </div>

        <div class="warning">
          <strong>Aviso Legal:</strong> Este documento é um pré-laudo preliminar gerado por inteligência artificial para fins de orçamento e identificação inicial de riscos. Não substitui um laudo técnico oficial assinado por um Engenheiro de Segurança do Trabalho (ART).
        </div>

        <div class="footer">
          Facilco Engenharia - Soluções Industriais e Corporativas<br>
          (19) 99622-3433 | engenharia@facilco.com.br
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const renderMessageContent = (msg: Message) => {
    const html = window.marked ? window.marked.parse(msg.text) : msg.text;
    const isReport = msg.text.includes("PRÉ-LAUDO TÉCNICO PRELIMINAR");

    // Attempt to find associated user image for the report button
    const msgIndex = messages.findIndex(m => m.id === msg.id);
    const prevMsg = msgIndex > 0 ? messages[msgIndex - 1] : null;
    const reportImage = prevMsg?.isUser && prevMsg?.image ? prevMsg.image : undefined;

    return (
      <div className="flex flex-col gap-2">
        {msg.image && (
          <div className="mb-2 rounded-lg overflow-hidden border border-gray-200">
            <img src={msg.image} alt="User upload" className="max-w-full h-auto max-h-48 object-cover" />
          </div>
        )}

        {msg.text && (
          msg.isUser
            ? <div>{msg.text}</div>
            : (
              <div className="relative">
                <div dangerouslySetInnerHTML={{ __html: html }} />
                {isReport && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => generatePDF(msg.text, reportImage)}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded transition shadow-sm uppercase tracking-wide"
                    >
                      <i className="fas fa-file-pdf"></i> Baixar PDF do Laudo (Oficial)
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mt-2">
                      *Gera um documento para aprovação de budget.
                    </p>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    );
  };

  return (
    <FacilcoPlasmaChat
      isOpen={isOpen}
      onToggle={toggleChat}
      onMessage={handleSend}
      onSpeech={handleSpeech}
    >
      <div className="flex flex-col gap-4 pb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`max-w-[90%] ${msg.isUser ? 'self-end' : 'self-start'}`}>
            <div className={`p-3 rounded-2xl shadow-sm text-sm ${msg.isUser
              ? 'bg-emerald-500 text-white rounded-tr-sm'
              : 'bg-white/80 backdrop-blur-sm border border-white/50 text-gray-800 rounded-tl-sm prose prose-sm max-w-none'
              }`}>
              {renderMessageContent(msg)}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="self-start max-w-[85%]">
            <div className="bg-white/50 p-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1 items-center h-10">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.32s]"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.16s]"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}

        {/* Quick Action: Analyze Problem (Hidden Input Trigger) */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />

        {!selectedImage && (
          <div className="self-center my-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/90 border border-emerald-200 text-emerald-700 hover:bg-emerald-500 hover:text-white transition rounded-full px-4 py-2 text-xs font-bold shadow-md flex items-center gap-2 backdrop-blur-sm"
            >
              <i className="fas fa-camera"></i>
              Analisar meu Problema (Foto)
            </button>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>
    </FacilcoPlasmaChat>
  );
};

export default ChatWidget;
