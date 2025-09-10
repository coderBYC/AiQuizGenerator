import Navbar from "@/components/ui/NavBar"
type LayoutProps = {
  children: React.ReactNode;
};


export default function QuizLayout({children}:LayoutProps) {
    return (
        <>  
              <Navbar />
              <div className="max-w-5xl mx-auto">{children}</div>
        </>
    )

}