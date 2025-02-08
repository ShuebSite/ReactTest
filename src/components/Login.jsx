import React, { useEffect } from 'react';
import { useAuth, hasAuthParams } from "react-oidc-context";

function Login() {
  const auth = useAuth();
  // ログイン試行フラグ：無限ループを防ぐために使用
  const [hasTriedSignin, setHasTriedSignin] = React.useState(false);

  // 意図的なログアウトフラグをチェック
  const isManuallyLoggedOut = localStorage.getItem('manuallyLoggedOut') === 'true';

  // automatically sign-in
  useEffect(() => {
    // 以下の全ての条件が満たされた場合にのみサインインを試行
    if (!hasAuthParams() &&           // 1. 認証パラメータがURLに存在しない
        !auth.isAuthenticated &&      // 2. まだ認証されていない
        !auth.activeNavigator &&      // 3. 認証プロセスが進行中でない
        !auth.isLoading &&            // 4. ローディング中でない
        !hasTriedSignin &&            // 5. まだサインインを試していない
        !isManuallyLoggedOut          // 6. 意図的なログアウトでない
    ) {
        auth.signinRedirect(); // 認証プロバイダーへリダイレクト
        setHasTriedSignin(true); // ログイン試行フラグを立てる（無限ループ防止）
    }
    }, [auth, hasTriedSignin, isManuallyLoggedOut]);

  // ログインボタンクリック時にログアウトフラグを削除
  const handleLogin = () => {
    localStorage.removeItem('manuallyLoggedOut');
    auth.signinRedirect();
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      marginTop: '20px'
    }}>
      <h2>ログインが必要です</h2>
      <p>このコンテンツを表示するにはログインしてください。</p>
      <button 
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ログイン
      </button>
    </div>
  );
}

export default Login;
