import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function validateUser() {
  const cookieStore = await cookies();
  let triedRefresh = false;
 
  const refreshToken = async () => {
    await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
    })
  };
  
  const getUser = async () => {
    const userResponse = await fetch('/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        },
    });
    
    const userData = await userResponse.json();
  
    if (new String(userData.error).includes('expired') && !triedRefresh) {
      cookieStore.delete('access-token');
      await refreshToken();
      triedRefresh = true;
      getUser();
    } 
  
    if (!userResponse.ok) {
      redirect('/auth/login')
    }
  
    return userData;
  };  

  return getUser();
}