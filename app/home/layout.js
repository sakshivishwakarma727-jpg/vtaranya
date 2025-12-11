import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomeLayout({ children }) {
  // cookies() is now async → must await it
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  // If no token → redirect to login
  if (!token) {
    redirect("/login");
  }

  // If logged in → render the page
  return <>{children}</>;
}
