// import { router } from 'expo-router';
// import { useState } from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// const loginPage = () => {

//     const [userName, setUserName] = useState('')
//     const [password, setPassword] = useState('')
//     const [user, setUser] = useState(null)

//     const loginSubmit = () => {
//         //Login realted function will come here
//     }

//   return (
//     <View>
//       <Text>login To WonderLand</Text>
//       <View>
//         <TextInput placeholder='Username or email' value={userName} onChangeText={setUserName} />
//         <TextInput placeholder='Password' secureTextEntry={true} value={password} onChangeText={setPassword} />

//         <TouchableOpacity onPress={() => loginSubmit}>
//           <Text>Login</Text>
//         </TouchableOpacity>

//         {/* routing to register page */}
//         <TouchableOpacity onPress={() => router.push({pathname: '/(auth)/registerPage'})} >
//           <Text>New to WondeLand?</Text>
//         </TouchableOpacity>

//       </View>
//     </View>
//   )
// }

// export default loginPage

// const styles = StyleSheet.create({})

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUserContext } from "../../contexts/UserContext";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const { logUser, user } = useUserContext();

  const loginSubmit = () => {
    setError("");

    if (!identifier.trim() || !password.trim()) {
      setError("Please enter your username/email and password.");
      return;
    }

    // ✅ your real login logic later
    const user = {
      userName: identifier,
      password: password,
    };
    logUser(user);
    router.replace("/(tabs)/Destinations");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Top */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="sparkles-outline" size={14} color="#0F766E" />
          <Text style={styles.badgeText}>Welcome back</Text>
        </View>

        <Text style={styles.title}>Login to WonderLand</Text>
        <Text style={styles.subtitle}>
          Continue exploring your saved places
        </Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Username/Email */}
        <View style={styles.inputWrap}>
          <Ionicons name="person-outline" size={18} color="#64748B" />
          <TextInput
            placeholder="Username or email"
            placeholderTextColor="#94A3B8"
            value={identifier}
            onChangeText={setIdentifier}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrap}>
          <Ionicons name="lock-closed-outline" size={18} color="#64748B" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={!showPw}
            returnKeyType="done"
            onSubmitEditing={loginSubmit}
          />

          <TouchableOpacity
            onPress={() => setShowPw((s) => !s)}
            style={styles.eyeBtn}
            activeOpacity={0.8}
          >
            <Ionicons
              name={showPw ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#64748B"
            />
          </TouchableOpacity>
        </View>

        {/* Error */}
        {!!error && <Text style={styles.error}>{error}</Text>}

        {/* Forgot */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={styles.forgotBtn}
        >
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Submit */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.primaryBtn}
          onPress={loginSubmit}
        >
          <Text style={styles.primaryText}>Login</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        {/* Switch */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/(auth)/registerPage")}
          style={styles.switchBtn}
        >
          <Text style={styles.switchText}>
            New to WonderLand?{" "}
            <Text style={styles.switchStrong}>Create one</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    justifyContent: "center",
  },

  header: {
    marginBottom: 18,
    alignItems: "center",
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    marginBottom: 12,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#0F766E",
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#0F172A",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2,
  },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    padding: 0,
  },

  eyeBtn: {
    padding: 6,
  },

  error: {
    color: "#EF4444",
    fontWeight: "700",
    marginBottom: 10,
    marginTop: -2,
  },

  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 14,
  },

  forgotText: {
    color: "#0F766E",
    fontWeight: "800",
    fontSize: 13,
  },

  primaryBtn: {
    backgroundColor: "#0F766E",
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  switchBtn: {
    marginTop: 14,
    alignItems: "center",
  },

  switchText: {
    color: "#64748B",
    fontWeight: "700",
  },

  switchStrong: {
    color: "#0F766E",
    fontWeight: "900",
  },
});
