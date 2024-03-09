import Header from '@/components/app/header/Header';
import Footer from '@/components/app/footer/Footer';
import Sidebar from '@/components/app/sidebar/Sidebar';

export default function AppLayout({
  children,
}) {
  return (
    <div className="flex max-h-screen overflow-hidden gap-x-6">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen overflow-auto">
        <div className="container mx-auto">
          <Header />
        </div>
        <div className="container flex-1 p-8 pt-10 mx-auto space-y-10">
          {children}
        </div>
        <div className="container mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  )
}
