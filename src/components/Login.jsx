import React from 'react';
import { useAuth } from "react-oidc-context";

const Login = () => {
    const auth = useAuth();

    if (auth.isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (auth.error) {
        return (
            <div className="text-red-500 p-4">
                エラーが発生しました: {auth.error.message}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">ログイン</h1>
                <button
                    onClick={() => auth.signinRedirect()}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Cognitoでログイン
                </button>
            </div>
        </div>
    );
};

export default Login; 