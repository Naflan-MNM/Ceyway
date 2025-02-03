import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


const SignupPage = ({navigation}) => {
  
    const GoToLogintPage = () => {
        navigation.navigate('LoginPage');
    };
    const GoToStartPage =()=>{
        navigation.navigate('StartPage')
    }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1A1A2E" barStyle="light-content" />
      <Text style={styles.logo}>Catalog</Text>
      <Text style={styles.headerText}>Join Ceyway Today!</Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor="#999"
      />
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

      <TouchableOpacity style={styles.signupButton} onPress={GoToStartPage}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Icon name="google" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.socialButtonText}>Sign up with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.facebookButton}>
        <Icon name="facebook" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginLinkButton} onPress={GoToLogintPage}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
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
  headerText: {
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
  signupButton: {
    width: "100%",
    backgroundColor: "#3b4fe4",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  signupButtonText: {
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
  loginLinkButton: {
    marginTop: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 14,
  },
  loginLink: {
    color: "#8ab4f8",
    textDecorationLine: "underline",
  },
});

export default SignupPage;
