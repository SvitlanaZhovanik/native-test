import { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);
  const onLogin = () => {
    Alert.alert("Credentials", `${name} + ${password}`);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "PlayfairDisplay-Regular": require("./assets/fonts/playfair/PlayfairDisplay-Regular.ttf"),
          "PlayfairDisplay-Bold": require("./assets/fonts/playfair/PlayfairDisplay-Bold.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("./assets/images/fon.png")}
          style={styles.bg}>
          <Text style={styles.title}> Hello world</Text>
          {/* <ImageBackground
            source={require("./assets/images/heart.png")}
            style={styles.heart}> */}
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2016/11/09/23/16/music-1813100_960_720.png",
            }}
            style={styles.img}
          />
          {/* </ImageBackground> */}
          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={nameHandler}
                style={styles.input}
                textContentType="username"
                textAlign="center"
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={passwordHandler}
                secureTextEntry={true}
                style={styles.input}
                textContentType="password"
                textAlign="center"
              />
              <Button title={"Login"} style={styles.input} onPress={onLogin} />
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: "#1F1440",
      },
      android: {
        backgroundColor: "#ffffff",
      },
    }),
    fontFamily: "PlayfairDisplay-Regular",
  },
  bg: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "blue",
    borderRadius: 16,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    overflow: "hidden",
    padding: 20,
    fontFamily: "PlayfairDisplay-Bold",
  },
  img: {
    width: 242,
    height: 270,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    backgroundColor: Platform.OS === "ios" ? "#ffffff" : "#a2d2ff",
    width: 320,
    borderRadius: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: Platform.OS === "ios" ? "#A531BF" : "#231942",
    borderWidth: 2,
    borderColor: "#61dafb",
    marginBottom: 15,
  },
});
