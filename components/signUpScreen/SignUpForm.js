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

import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
} from "../../firebase";

const SignUpForm = ({ navigation }) => {
  const logInFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string()
      .required()
      .min(2, "A user name is required, min 2 char."),
    password: Yup.string()
      .required()
      .min(6, "Password must be at least of 6 charactrs"),
  });

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignUp = async (email, username, password) => {
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("🔥 Firebase Sign Up was successful ✅ ", email, password);

      const docRef = doc(db, "users", authUser.user.email);

      await setDoc(docRef, {
        owner_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profile_picture: await getRandomProfilePicture(),
      });
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
            text: "Log In",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          onSignUp(values.email, values.username, values.password);
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
                placeholder="Email"
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
                    values.username.length > 1 || values.username.length < 1
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="User name"
                autoCapitalize="none"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
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
            ></View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#6bb0f5" }}>{"  "}Log In</Text>
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

export default SignUpForm;
