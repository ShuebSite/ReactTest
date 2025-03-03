export class REST_API {
    static ENDPOINT_EMAIL = import.meta.env.VITE_EMAIL_SEND_ENDPOINT;
    static API_KEY_EMAIL = import.meta.env.VITE_EMAIL_SEND_API_KEY;
    static REQUEST_TIMEOUT_MS = 5000;
  
    // ローカルストレージからトークンを取得し、有効期限をチェック
    static getAccessToken() {
        const storageKey = 'oidc.user:https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_qsJXNKTRH:11rtumj9menqpcdg9lbeghpnt8';
        try {
            const userJson = localStorage.getItem(storageKey);
            if (userJson) {
                const user = JSON.parse(userJson);
                
                // 有効期限のチェック
                if (user.expires_at) {
                    const expirationTime = user.expires_at * 1000; // Unix timestamp を ミリ秒に変換
                    const currentTime = new Date().getTime();
                    
                    // トークンの有効期限が切れているかチェック
                    if (currentTime >= expirationTime) {
                        console.warn('トークンの有効期限が切れています。', {
                            現在時刻: new Date(currentTime).toLocaleString(),
                            有効期限: new Date(expirationTime).toLocaleString()
                        });
                        return null;
                    }

                    // 有効期限が近づいている場合の警告（例：残り5分以内）
                    const timeUntilExpiry = expirationTime - currentTime;
                    const warningThreshold = 5 * 60 * 1000; // 5分
                    if (timeUntilExpiry <= warningThreshold) {
                        console.warn('トークンの有効期限が近づいています。', {
                            残り時間: Math.floor(timeUntilExpiry / 1000) + '秒',
                            有効期限: new Date(expirationTime).toLocaleString()
                        });
                    }

                    return user.id_token;
                } else {
                    console.error('トークンの有効期限情報が見つかりません');
                    return null;
                }
            }
        } catch (error) {
            console.error('トークン取得エラー:', error);
        }
        return null;
    }

    // Access-Control-Allow-OriginはAPI Gatewayの方で有効化しておく
    static headers_email = {
        "content-type": "application/json",
        "x-api-key": this.API_KEY_EMAIL,
        get Authorization() {
            return `Bearer ${REST_API.getAccessToken()}`;
        }
    };
    
    // Eメール送信API　リクエストボディ
    static createEmailSendBody(recipientEmail) {
        return {
            recipientEmailAddresses: [recipientEmail]
        };
    }
  
  }