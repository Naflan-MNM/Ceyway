import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const LoginPage = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    const GoToSignuptPage = () => {
        navigation.navigate('SignupPage');
    };

    /* note here after you connecting with the backend you have to comment this function (GoToStartPage)
    and then recommant the handlelogin function and follow the commnet which i have wrote thorughout the code */
    const GoToStartPage =()=>{
        navigation.navigate('StartPage')
    }
    /* const handleLogin = async () => {
      try {
        setLoading(true);
        const location = "sri-lanka"; // you can replace this later with dynamic input
        const response = await axios.get(`http://localhost:8080/api/travel-app/get-attractions/${location}`);
        const trendingData = response.data;

        navigation.navigate('StartPage', { trendingDestinations: trendingData });
      } catch (error) {
        console.error('Error fetching trending destinations:', error);
        Alert.alert("Error", "Failed to fetch trending destinations.");
      } finally {
        setLoading(false);
      }
    }; */
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1A1A2E" barStyle="light-content" />
      <Text style={styles.logo}>Catalog</Text>
      <Text style={styles.welcomeText}>Welcome Back to Ceyway!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

    {/* here after replacing that above funcion you have replace this code into
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>
       */}
      <TouchableOpacity style={styles.loginButton} onPress={GoToStartPage}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Icon name="google" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.socialButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.facebookButton}>
        <Icon name="facebook" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createAccountButton} onPress={GoToSignuptPage}>
        <Text style={styles.createAccountText}>
          New to Ceyway? <Text style={styles.createAccountLink}>Create an Account</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#8ab4f8",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#3b4fe4",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#ccc",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#db4437",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4267B2",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  createAccountButton: {
    marginTop: 20,
  },
  createAccountText: {
    color: "#fff",
    fontSize: 14,
  },
  createAccountLink: {
    color: "#8ab4f8",
    textDecorationLine: "underline",
  },
});

export default LoginPage;
