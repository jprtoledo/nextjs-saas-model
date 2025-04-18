import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access-token');

  if (accessToken) {
    redirect('/dashboard')
  } else {
    redirect('/auth/login')
  }
}
