import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const projectId = Constants.expoConfig?.extra?.eas?.projectId;

// put your real client ids here or env
const ANDROID =
  "127516239222-u0ovpru2q91d814g5ms2omhcpbl3tc2a.apps.googleusercontent.com";
const IOS =
  "127516239222-u0ovpru2q91d814g5ms2omhcpbl3tc2a.apps.googleusercontent.com";
const WEB =
  "127516239222-u0ovpru2q91d814g5ms2omhcpbl3tc2a.apps.googleusercontent.com";

const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
  //to solve  [Error: Cannot use the AuthSession proxy because the project full name is not defined. Prefer AuthRequest in combination with an Expo Development Client build of your application. To continue using the AuthSession proxy, specify the project full name (@owner/slug) using the projectNameForProxy option.]
  projectNameForProxy: "@bathila/trip-app",
});

console.log("Redirect URI:", redirectUri);

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: WEB,
    androidClientId: ANDROID,
    iosClientId: IOS,
    webClientId: WEB,
    scopes: ["openid", "profile", "email"],
    responseType: "id_token",
    projectId,
    prompt: "select_account",
    // redirectUri: "https://auth.expo.io/@bathila/trip-app", // Use the correct redirect URI for your project
    // for again opening the app after google login, you can use the default redirect URI provided by expo-auth-session or set up a custom scheme and use it here
    // redirectUri: AuthSession.getRedirectUrl({ scheme: "tripapp" }),
    redirectUri

  });

  const getGoogleTokenFromResponse = () => {
    if (response?.type !== "success") return null;
    return (
      response?.authentication?.idToken ||
      response?.authentication?.accessToken ||
      null
    );
  };

  return { request, response, promptAsync, getGoogleTokenFromResponse, redirectUri };
};
