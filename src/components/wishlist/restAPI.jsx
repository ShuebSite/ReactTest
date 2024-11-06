export class REST_API {

    static ENDPOINT_EMAIL = import.meta.env.VITE_EMAIL_SEND_ENDPOINT;
    static API_KEY_EMAIL = import.meta.env.VITE_EMAIL_SEND_API_KEY;
    static REQUEST_TIMEOUT_MS = 5000;
  
    // Access-Control-Allow-OriginはAPI Gatewayの方で有効化しておく
    static headers_email = {
      "content-type": "application/json",
      "x-api-key": this.API_KEY_EMAIL
    }
    
    // Eメール送信API　リクエストボディ
    static createEmailSendBody(recipientEmail) {
        return {
            recipientEmailAddresses: [recipientEmail]
        };
    }
  
  }