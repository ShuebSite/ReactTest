import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import Routing from './Routing.jsx'
import { useAuth } from "react-oidc-context";
import Login from './components/Login';

function App() {
  const auth = useAuth();
  const [urlToken, setUrlToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('code');
    if (token) {
      setUrlToken(token);
    }
  }, []);

  const signOutRedirect = () => {
    const clientId = "3u1317g4pjb9g72ubasbdpnpa9";
    const logoutUri = "http://localhost:5173";
    const cognitoDomain = "https://wishlist.auth.ap-southeast-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  switch (auth.activeNavigator) {
    case "signinSilent":
        return <div>Signing you in...</div>;
    case "signoutRedirect":
        return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      {urlToken && (
        <div>
          <pre>URL Token: {urlToken}</pre>
          <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>
        </div>
      )}
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}


  
export default App;

// export default function App() {
//   const auth = useAuth();

//     // if (auth.isLoading) {
//     //     return <div>読み込み中...</div>;
//     // }

//     // if (auth.error) {
//     //     return <div>エラーが発生しました: {auth.error.message}</div>;
//     // }

//     // if (!auth.isAuthenticated) {
//     //     return <Login />;
//     // }
//   return (
//     <div className='app'>
//       <BrowserRouter>
//         < Routing />
//       </BrowserRouter>
//     </div>
//   );
// }

