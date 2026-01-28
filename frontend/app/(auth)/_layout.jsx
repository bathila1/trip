import { Stack } from "expo-router";
import UserContext from "../../contexts/UserContext";

const authLayout = () => {
  return (
    <UserContext>
      <Stack>
        <Stack.Screen name="loginPage" options={{ headerShown: false }} />
        <Stack.Screen name="registerPage" options={{ headerShown: false }} />
      </Stack>
    </UserContext>
  );
};

export default authLayout;
