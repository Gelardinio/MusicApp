import React from "react";
import Button from './Button';
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { makeRedirectUri } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

const AuthLogin = () => {

    const jwtDecode = require('jwt-decode');

    async function saveJWT(key, value) {
      await SecureStore.setItemAsync(key, value);
    }

    const discovery = {
        authorizationEndpoint: 
        "https://accounts.spotify.com/authorize",
        tokenEndpoint: 
        "https://accounts.spotify.com/api/token",
    };
      
    console.log(makeRedirectUri({ useProxy: true }))

    const [token, setToken] = React.useState("");
    const [request, response, promptAsync] = 
    useAuthRequest(
      {
        responseType: ResponseType.Token,
        clientId: '',
        scopes: [
          "user-read-currently-playing",
          "user-read-recently-played",
          "user-read-playback-state",
          "user-top-read",
          "user-modify-playback-state",
          "streaming",
          "user-read-email",
          "user-read-private",
        ],
        usePKCE: false,
        redirectUri: "exp://192.168.2.244:19000",
      },
      discovery
    );

    React.useEffect(() => {
        if (response?.type === "success") {
          const { access_token } = response.params;
          console.log(access_token)
          setToken(access_token);
          saveJWT("token", access_token);
        }
    }, [response]);

    return (
        <>
            <Button text="Auth Spotify" pressFunc={() => promptAsync()}></Button>
        </>
    )
}

export default AuthLogin;