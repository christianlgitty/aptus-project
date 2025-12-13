import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

const BG = "#020617"; // near-black
const CARD = "#0b1220";
const BORDER = "rgba(255,255,255,0.08)";
const MUTED = "rgba(255,255,255,0.75)";
const ACCENT = "#22d3ee";

const FILTERS = ["All", "Running", "Triathlon", "Hyrox", "OCR", "Cycling"];

const MOCK_EVENTS = [
  { id: "1", name: "Aptus 5K Downtown", type: "Running", city: "Minneapolis, MN", date: "Jan 18" },
  { id: "2", name: "Winter Hyrox Throwdown", type: "Hyrox", city: "St. Paul, MN", date: "Feb 2" },
  { id: "3", name: "Spring Sprint Tri", type: "Triathlon", city: "Chaska, MN", date: "Mar 10" },
  { id: "4", name: "Mud & Steel OCR", type: "OCR", city: "Stillwater, MN", date: "Apr 6" },
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return MOCK_EVENTS.filter((e) => {
      const matchesQuery =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q);

      const matchesFilter = activeFilter === "All" || e.type === activeFilter;

      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>Find events near you</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by event, city, or type…"
          placeholderTextColor="rgba(255,255,255,0.45)"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersRow}>
        <FlatList
          data={FILTERS}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}
          renderItem={({ item }) => {
            const isActive = item === activeFilter;
            return (
              <TouchableOpacity
                onPress={() => setActiveFilter(item)}
                style={[
                  styles.chip,
                  isActive && styles.chipActive,
                ]}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Results */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {results.length} result{results.length === 1 ? "" : "s"}
        </Text>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.type}</Text>
              </View>
            </View>

            <Text style={styles.cardMeta}>{item.city}</Text>
            <Text style={styles.cardMeta}>{item.date}</Text>

            <TouchableOpacity style={styles.cta}>
              <Text style={styles.ctaText}>View Event</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No matches</Text>
            <Text style={styles.emptySub}>Try a different search or filter.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },

  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  title: { color: "white", fontSize: 28, fontWeight: "700" },
  subtitle: { color: MUTED, marginTop: 4 },

  searchWrap: { paddingHorizontal: 16, paddingBottom: 12 },
  searchInput: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "white",
    fontSize: 16,
  },

  filtersRow: { paddingVertical: 6 },
  chip: {
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  chipActive: {
    borderColor: "rgba(34,211,238,0.6)",
    backgroundColor: "rgba(34,211,238,0.12)",
  },
  chipText: { color: MUTED, fontWeight: "600" },
  chipTextActive: { color: "white" },

  resultsHeader: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10 },
  resultsText: { color: MUTED },

  card: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 14,
  },
  cardTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  cardTitle: { color: "white", fontSize: 16, fontWeight: "700", flex: 1 },

  badge: {
    borderWidth: 1,
    borderColor: "rgba(34,211,238,0.5)",
    backgroundColor: "rgba(34,211,238,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: { color: "white", fontWeight: "700", fontSize: 12 },

  cardMeta: { color: MUTED, marginTop: 6 },

  cta: {
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(34,211,238,0.35)",
  },
  ctaText: { color: "white", fontWeight: "700" },

  empty: { paddingHorizontal: 16, paddingTop: 30, alignItems: "center" },
  emptyTitle: { color: "white", fontSize: 18, fontWeight: "700" },
  emptySub: { color: MUTED, marginTop: 6 },
});