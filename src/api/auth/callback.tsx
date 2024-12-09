import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code) {
        const res = await fetch('http://localhost:5002/api/auth/callback');
        if (res.ok) {
          router.push('/dashboard'); // Redirect to dashboard
        } else {
          console.error('Login failed');
        }
      }
    };
    handleCallback();
  }, []);
  

  return <div>Loading...</div>;
};

export default Callback;
