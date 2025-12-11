import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const BG = "#020617"; // near-black
const NEON_BLUE = "#22d3ee";
const CARD_BG = "#020617";

export default function HomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1 — TOP NAV BAR */}
        <View style={styles.navBar}>
          <Text style={styles.logo}>APTUS</Text>

          <View style={styles.navCenter}>
            <Text style={styles.navLink}>Running</Text>
            <Text style={styles.navLink}>Cycling</Text>
            <Text style={styles.navLink}>Hybrid</Text>
            <Text style={styles.navLink}>Trail</Text>
            <Text style={styles.navLink}>Swim</Text>
            <Text style={styles.navLink}>More</Text>
          </View>

          <View style={styles.navRight}>
            <Text style={styles.icon}>🔍</Text>
            <Text style={styles.icon}>👤</Text>
          </View>
        </View>

        {/* SECTION 2 — HERO BANNER */}
        <ImageBackground
          source={{
            uri:
              "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg",
          }}
          resizeMode="cover"
          style={styles.hero}
        >
          {/* dark overlay */}
          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Discover the world{"\n"}through endurance.
            </Text>
            <Text style={styles.heroSubtitle}>
              Aptus helps you explore races, hybrids, and trail events worldwide
              with real athlete insight.
            </Text>

            <TouchableOpacity
  style={styles.heroButton}
  onPress={() => navigation.navigate("Search")}
>
  <Text style={styles.heroButtonText}>Filter &amp; Search →</Text>
</TouchableOpacity>

          </View>
        </ImageBackground>

        {/* SECTION 3 — QUICK STATS BAR */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🏅</Text>
            <Text style={styles.statTitle}>Explore 20+ sports</Text>
            <Text style={styles.statSubtitle}>
              From road races to hybrid events.
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={styles.statTitle}>Built for your season</Text>
            <Text style={styles.statSubtitle}>
              Plan races, deloads, and key efforts.
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🌍</Text>
            <Text style={styles.statTitle}>Global events</Text>
            <Text style={styles.statSubtitle}>
              Discover races across countries & climates.
            </Text>
          </View>
        </View>

        {/* SECTION 4 — CATEGORY GRID */}
        <View style={styles.categoryGrid}>
          <CategoryCard
            title="Running"
            count="12,480 events"
            image="https://images.pexels.com/photos/2402778/pexels-photo-2402778.jpeg"
          />
          <CategoryCard
            title="Triathlon"
            count="1,390 events"
            image="https://images.pexels.com/photos/3763876/pexels-photo-3763876.jpeg"
          />
          <CategoryCard
            title="Cycling"
            count="2,708 events"
            image="https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg"
          />
          <CategoryCard
            title="Swimming"
            count="436 events"
            image="https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg"
          />
          <CategoryCard
            title="Trail running"
            count="10,499 events"
            image="https://images.pexels.com/photos/2402770/pexels-photo-2402770.jpeg"
          />
          <CategoryCard
            title="Hybrid / Functional"
            count="842 events"
            image="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CategoryCard({ title, count, image }) {
  return (
    <View style={styles.cardWrapper}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.card}
        imageStyle={styles.cardImage}
      >
        <View style={styles.cardOverlay} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardCount}>{count}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    paddingBottom: 32,
  },

  // NAV BAR
  navBar: {
    backgroundColor: "#020617",
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#1f2937",
  },
  logo: {
    color: NEON_BLUE,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 4,
  },
  navCenter: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 12,
  },
  navLink: {
    fontSize: 11,
    color: "#e5e7eb",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  navRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    fontSize: 16,
    color: "#e5e7eb",
  },

  // HERO
  hero: {
    height: 320,
    justifyContent: "flex-end",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  heroContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#e5e7eb",
    marginBottom: 18,
  },
  heroButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  heroButtonText: {
    color: BG,
    fontWeight: "700",
  },

  // STATS BAR
  statsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  statItem: {
    flex: 1,
    paddingHorizontal: 8,
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  statTitle: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },
  statSubtitle: {
    color: "#cbd5e1",
    fontSize: 12,
    marginTop: 4,
  },

  // CATEGORY GRID
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: CARD_BG,
  },
  card: {
    height: 140,
    justifyContent: "flex-end",
  },
  cardImage: {
    borderRadius: 12,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.28)",
    borderRadius: 12,
  },
  cardTextContainer: {
    padding: 12,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  cardCount: {
    color: "#cbd5e1",
    fontSize: 12,
    marginTop: 4,
  },
});