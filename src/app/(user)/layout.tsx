import Navbar from "@/components/ui/NavBar";
const UserDashboardLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>  
      <Navbar />
      <div className="max-w-5xl mx-auto">{children}</div>
    </>
    
  )
}

export default UserDashboardLayout;