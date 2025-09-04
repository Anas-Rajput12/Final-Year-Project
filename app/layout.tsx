import '../styles/globals.css';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import Footer from '../components/Footer';
import ChatBot from '../components/Chatbot';
import VoiceAssistant from '../components/VoiceAssistant';

export const metadata = {
  title: 'QUEST Voice Assistant',
  description: 'FYP - Student Support System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <ChatBot />
        <VoiceAssistant />
        <Footer />
      </body>
    </html>
  );
}
