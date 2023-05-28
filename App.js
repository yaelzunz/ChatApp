import { StatusBar } from 'expo-status-bar';
import React, {createContext, useContext, useEffect, useState} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./config/firebase";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Chat from "./screens/Chat";

const Stack = createStackNavigator();
export const AuthenticatedUserContext = createContext({});

function ChatStack() {
    return (
        <Stack.Navigator defaultScreenOptions={Home}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator
            defaultScreenOptions={Login}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    );
}

function RootNavigator() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
            authenticatedUser ? setUser(authenticatedUser) : setUser(null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <ChatStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

const AuthenticatedUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthenticatedUserContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticatedUserContext.Provider>
    );
};

export default function App() {
  return (
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
