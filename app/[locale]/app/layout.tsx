import Navbar from "@/components/navbar";
import { NewUserModal } from "@/components/newUserModal";
import Sidebar from "@/components/sidebar";
import { isNewUser } from "@/lib/professional";

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {

 const newUser = await isNewUser();
 
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg- bg-gray-900">
            <Sidebar />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        {newUser && (
            <NewUserModal />
        )}
        </div>
    );
}

export default DashboardLayout;