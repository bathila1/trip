import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProfPic from "../../assets/images/ProfPic.png";
import { useUserContext } from "../../contexts/UserContext";

const ProfileView = () => {
  const { logout, user, loadProfile } = useUserContext();
  const [modalVisible, setModalVisible] = useState(false);

  // VARIABLE TO STORE SELECTED IMAGE
  const [selectedAvatar, setSelectedAvatar] = useState(ProfPic);

  useEffect(() => {
    if (!user) loadProfile();
  }, []);

  // Abstract Traveler Avatars
  const avatarOptions = [
    { id: "1", url: "https://robohash.org/traveler1?set=set5" },
    { id: "2", url: "https://robohash.org/explorer2?set=set5" },
    { id: "3", url: "https://robohash.org/backpacker3?set=set5" },
    { id: "4", url: "https://robohash.org/nomad4?set=set5" },
    { id: "5", url: "https://robohash.org/pilot5?set=set5" },
    { id: "6", url: "https://robohash.org/hiker6?set=set5" },
    { id: "7", url: "https://robohash.org/surfer7?set=set5" },
    { id: "8", url: "https://robohash.org/camper8?set=set5" },
    { id: "9", url: "https://robohash.org/diver9?set=set5" },
    { id: "10", url: "https://robohash.org/map10?set=set5" },
    { id: "11", url: "https://robohash.org/sun11?set=set5" },
    { id: "12", url: "https://robohash.org/sky12?set=set5" },
  ];

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const selectNewAvatar = (imgUrl) => {
    setSelectedAvatar({ uri: imgUrl });
    setModalVisible(false);
  };

  if (!user)
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER - Matches MyTrip/Destinations Style */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Profile</Text>
          <Text style={styles.subtitle}>Manage your account details</Text>
        </View>

        <TouchableOpacity style={styles.logoutCircle} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.avatarWrapper}>
            <Image source={selectedAvatar} style={styles.avatar} />
            <TouchableOpacity
              style={styles.penCircle}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="images-sharp" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.fullName}</Text>

          <View style={styles.bioBox}>
            <Text style={[styles.bioText, !user.bio && styles.placeholderText]}>
              {user.bio || "No bio added yet. Tell us about your travel style!"}
            </Text>
          </View>
        </View>

        {/* DETAILS SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.infoTile}>
            <View style={styles.tileIcon}>
              <Ionicons name="mail-outline" size={18} color="#64748B" />
            </View>
            <View>
              <Text style={styles.tileLabel}>Email Address</Text>
              <Text style={styles.tileValue}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.infoTile}>
            <View style={styles.tileIcon}>
              <Ionicons name="call-outline" size={18} color="#64748B" />
            </View>
            <View>
              <Text style={styles.tileLabel}>Phone Number</Text>
              <Text style={styles.tileValue}>
                {user.phone || "Not provided"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.9}>
            <Text style={styles.primaryBtnText}>Edit Profile</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* POP-UP MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* RED CLOSE BUTTON TOP RIGHT */}
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-circle" size={30} color="#EF4444" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Update Photo</Text>

            <View style={styles.mediaOptions}>
              <TouchableOpacity style={styles.mediaBtn}>
                <Ionicons name="camera" size={22} color="#0F766E" />
                <Text style={styles.mediaText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaBtn}>
                <Ionicons name="image" size={22} color="#0F766E" />
                <Text style={styles.mediaText}>Gallery</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.miniDivider} />
            <Text style={styles.gridLabel}>Traveler Avatars</Text>

            <FlatList
              data={avatarOptions}
              numColumns={4}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectNewAvatar(item.url)}>
                  <Image source={{ uri: item.url }} style={styles.avatarItem} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 26, fontWeight: "800", color: "#0F172A" },
  subtitle: { fontSize: 13, fontWeight: "600", color: "#64748B", marginTop: 2 },
  logoutCircle: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  heroSection: { alignItems: "center", marginTop: 20, paddingHorizontal: 16 },
  avatarWrapper: { position: "relative", marginBottom: 12 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  penCircle: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#0F766E",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  userName: { fontSize: 22, fontWeight: "900", color: "#0F172A" },
  bioBox: {
    marginTop: 10,
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 14,
    width: "100%",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  bioText: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "600",
  },
  placeholderText: { color: "#94A3B8", fontStyle: "italic" },
  section: { marginTop: 25, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },
  infoTile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  tileIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  tileLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
  },
  tileValue: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
  footer: { paddingHorizontal: 16, marginTop: 20, paddingBottom: 40 },
  primaryBtn: {
    backgroundColor: "#0F766E",
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  primaryBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    position: "relative",
  },
  closeIcon: { position: "absolute", top: 12, right: 12, zIndex: 10 },
  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 20,
    marginTop: 10,
  },
  mediaOptions: { flexDirection: "row", gap: 15, marginBottom: 20 },
  mediaBtn: {
    alignItems: "center",
    backgroundColor: "#F0FDFA",
    padding: 12,
    borderRadius: 16,
    width: 90,
    borderWidth: 1,
    borderColor: "#CCFBF1",
  },
  mediaText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F766E",
    marginTop: 4,
  },
  miniDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    width: "100%",
    marginBottom: 15,
  },
  gridLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#94A3B8",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  avatarItem: { width: 60, height: 60, borderRadius: 30, margin: 6 },
});
