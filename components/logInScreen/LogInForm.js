import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import { auth, signInWithEmailAndPassword } from "../../firebase";

const LogInForm = ({ navigation }) => {
  const logInFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Password must be at least of 6 charactrs"),
  });

  const onLogIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("🔥 Firebase Login was successful ✅ ", email, password);
    } catch (error) {
      Alert.alert(
        "OMG!",
        "ERROR " +
          error.message.slice(22, -2).split("-").join(" ") +
          "\n\nWhat would you like to do next?",
        [
          {
            text: "OK!",
            onPress: () => console.log("OK!"),
          },
          {
            text: "Sign Up",
            onPress: () => navigation.push("SignUpScreen"),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogIn(values.email, values.password);
        }}
        validationSchema={logInFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, isValid, values }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    Validator.validate(values.email) || values.email < 1
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone Number, User Name or Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length > 5
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <View
              style={{
                marginBottom: 30,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Text style={{ color: "#6bb0f5" }}>Forgot Password?</Text>
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Don't have account? </Text>
              <TouchableOpacity onPress={() => navigation.push("SignUpScreen")}>
                <Text style={{ color: "#6bb0f5" }}>{"  "}Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 40,
  },
  inputField: {
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 10,
    padding: 6,
    backgroundColor: "#fafafa",
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096f6" : "#9acaf9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    minHeight: 40,
  }),
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
});

export default LogInForm;
