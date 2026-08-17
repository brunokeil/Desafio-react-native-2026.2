import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 40 - CARD_MARGIN) / 2; // 40 is horizontal padding (20 each side)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  contentContainer: {
    paddingBottom: 24,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 20,
  },
  exploreText: {
    color: "#E0232A",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  titlePrimary: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  titleSecondary: {
    color: "#888",
    fontSize: 32,
    fontStyle: "italic",
    fontWeight: "400",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: "#333",
  },
  searchInput: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    marginLeft: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "transparent",
  },
  categoryButtonActive: {
    backgroundColor: "#FFF",
    borderColor: "#FFF",
  },
  categoryText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#000",
    fontWeight: "600",
  },
  productsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  productsCount: {
    color: "#888",
    fontSize: 14,
  },
  sortText: {
    color: "#888",
    fontSize: 14,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: CARD_MARGIN,
    justifyContent: "space-between",
  },
  gridCard: {
    width: CARD_WIDTH,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  tagBadge: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#E0232A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  tagBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  imagePlaceholder: {
    height: 160,
    backgroundColor: "#222",
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: {
    color: "#888",
    fontSize: 14,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
