import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // neon glow
  const glowAnim = useRef(new Animated.Value(0)).current;

  // scroll effects
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [glowAnim]);

  const glowStyle = {
    shadowColor: "#00E5FF",
    shadowOpacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.35, 1],
    }),
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [4, 14],
    }),
  };

  // Parallax: video moves slower than scroll
  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, 220],
    outputRange: [0, -70],
    extrapolate: "clamp",
  });

  // Fade out hero as you scroll down
  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 160, 260],
    outputRange: [1, 0.85, 0.0],
    extrapolate: "clamp",
  });

  const onSignUpPress = () => console.log("Email sign up");
  const onGooglePress = () => console.log("Google sign up");
  const onApplePress = () => console.log("Apple sign up");

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* HERO (full-width) */}
          <Animated.View
            style={[
              styles.heroWrap,
              { opacity: heroOpacity, transform: [{ translateY: heroTranslateY }] },
            ]}
          >
            <Video
              source={require("../assets/triathalon-sign-up-page-image.mp4")}
              style={styles.heroVideo}
              resizeMode="cover"
              shouldPlay
              isLooping
              isMuted
            />

            {/* Dark overlay so the card + logo remain readable */}
            <View style={styles.heroOverlay} />

            {/* Gradient fade to black at bottom of hero */}
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.85)", "rgba(0,0,0,1)"]}
              style={styles.heroFade}
              pointerEvents="none"
            />
          </Animated.View>

          {/* Logo sits slightly on top of the hero area */}
          <View style={styles.logoRow}>
            <Text style={styles.logo}>APTUS</Text>
          </View>

          {/* CARD overlaps hero */}
          <Animated.View style={[styles.card, glowStyle]}>
            <Text style={styles.title}>Create your account</Text>

            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirm}
              onChangeText={setConfirm}
              style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google */}
            <TouchableOpacity style={styles.socialButton} onPress={onGooglePress}>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity style={styles.socialButton} onPress={onApplePress}>
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Extra bottom space so it scrolls nicely */}
          <View style={{ height: 40 }} />
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const HERO_HEIGHT = 260;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    paddingBottom: 40,
    backgroundColor: "#000",
  },

  // HERO
  heroWrap: {
  width: "100%",
  height: 280,
  overflow: "hidden",
  borderBottomLeftRadius: 28,
  borderBottomRightRadius: 28,
},
  heroVideo: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  heroFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 130,
  },

  // Logo sits between hero and card
  logoRow: {
    marginTop: -52,
    alignItems: "center",
  },
  logo: {
    color: "#00E5FF",
    fontSize: 22,
    letterSpacing: 4,
    fontWeight: "900",
    marginBottom: 14,
  },

  // CARD overlaps hero
  card: {
    alignSelf: "center",
    width: "96%", // wider
    backgroundColor: "#050505",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    marginTop: -10, // overlap feel
    shadowColor: "#00E5FF",
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    marginBottom: 14,
    color: "#fff",
  },
  button: {
    backgroundColor: "#00E5FF",
    paddingVertical: 14,
    borderRadius: 50,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#1F2937",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#9CA3AF",
    fontSize: 12,
  },
  socialButton: {
    height: 50,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#374151",
    backgroundColor: "#0B1220",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  socialButtonText: {
    color: "#F9FAFB",
    fontWeight: "600",
    fontSize: 15,
  },
});
