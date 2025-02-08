import { useAuth } from "react-oidc-context";

const isProd = import.meta.env.VITE_APP_ENV === 'production';

// 本番環境/開発環境のリダイレクトURL
export const redirectUri = isProd ? "https://wish1ist.xyz" : "http://localhost:5173";

// 本番環境/開発環境のリダイレクトURL（ログアウト用）
export const logoutUri = redirectUri;

// signOutRedirect関数をエクスポート
export const signOutRedirect = () => {
  const clientId = "11rtumj9menqpcdg9lbeghpnt8";
  const cognitoDomain = "https://ap-southeast-2qsjxnktrh.auth.ap-southeast-2.amazoncognito.com";
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};

// トークン更新関数をエクスポート
export const refreshToken = async (auth) => {
  try {
    const user = await auth.signinSilent();
    if (user) {
      console.log('トークンを更新しました');
      return {
        success: true,
        user: user
      };
    } else {
      console.error('トークン更新失敗: ユーザー情報が取得できません');
      return {
        success: false,
        error: 'ユーザー情報が取得できません'
      };
    }
  } catch (error) {
    console.error('トークン更新エラー:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// エラー表示コンポーネントをエクスポート
export const AuthError = ({ error }) => {
  if (!error) return null;
  
  return (
    <div style={{
      backgroundColor: '#ffebee',
      color: '#c62828',
      padding: '12px',
      margin: '10px',
      borderRadius: '4px',
      border: '1px solid #ef9a9a',
      textAlign: 'center'
    }}>
      認証エラー: {error.message}
    </div>
  );
};

// デバッグ用に認証情報を表示するコンポーネント
function AuthInfo() {
  const auth = useAuth();

  // トークン更新ボタンのハンドラー
  const handleTokenRefresh = async () => {
    const result = await refreshToken(auth);
    if (result.success) {
      alert('トークンを更新しました');
    } else {
      alert(`トークン更新に失敗しました: ${result.error}`);
    }
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  // エラー表示を共通コンポーネントに変更
  if (auth.error) {
    return <AuthError error={auth.error} />;
  }

  return (
    <div className="auth-info">
      <h2>認証情報</h2>
      
      {auth.isAuthenticated && (
        <button 
          onClick={handleTokenRefresh}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          トークンを更新
        </button>
      )}

      {/* デバッグ用の全認証情報 */}
      <pre style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '4px',
        overflow: 'auto' 
      }}>
        {JSON.stringify(auth, null, 2)}
      </pre>

      <div>
        <h3>主な認証情報</h3>
        <ul>
          <li>ログイン状態: {auth.isLoading ? '読み込み中...' : (auth.isAuthenticated ? 'ログイン中' : '未ログイン')}</li>
          {auth.isAuthenticated && (
            <>
              <pre>Hello: {auth.user?.profile.email}</pre>
              <pre>ID Token: {auth.user?.id_token}</pre>
              <pre>Access Token: {auth.user?.access_token}</pre>
              <pre>Refresh Token: {auth.user?.refresh_token}</pre>
              <li>ユーザーID: {auth.user?.profile.sub}</li>
              <li>メールアドレス: {auth.user?.profile.email}</li>
              <li>アクセストークン: {auth.user?.access_token}</li>
              <li>リフレッシュトークン: {auth.user?.refresh_token}</li>
              <li>IDトークン: {auth.user?.id_token}</li>
              <li>トークン有効期限: {auth.user?.expires_at ? new Date(auth.user.expires_at * 1000).toLocaleString() : '-'}</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AuthInfo;
