// import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import ProfPic from '../../assets/images/ProfPic.png';

// const ProfileView = () => {
//   const userData = {
//     name: "Alex Dev",
//     email: "alex.risk@startup.io",
//     avatar: "https://via.placeholder.com/150",
//   };

//   // Structured to link comments to specific post context
//   const userComments = [
//     {
//       id: '1',
//       postTitle: 'AI Market Trends 2026',
//       comment: 'I think the risk-to-reward ratio here is undervalued.'
//     },
//     {
//       id: '2',
//       postTitle: 'React Native vs Flutter',
//       comment: 'Native modules are still king for high-performance ML integration.'
//     },
//     {
//       id: '3',
//       postTitle: 'Side Hustle: SaaS Boilerplates',
//       comment: 'Added this to my weekend sprint list.'
//     },
//   ];

//   const renderComment = ({ item }) => (
//     <View style={styles.commentCard}>
//       <Text style={styles.postReference}>On: {item.postTitle}</Text>
//       <Text style={styles.commentText}>"{item.comment}"</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Profile Header */}
//       <View style={styles.header}>
//         <Image source={ProfPic} style={styles.profilePic} />
//         <Text style={styles.name}>{userData.name}</Text>
//         <Text style={styles.email}>{userData.email}</Text>
//       </View>

//       {/* Activity Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Recent Post Comments</Text>
//         <FlatList
//           data={userComments}
//           keyExtractor={(item) => item.id}
//           renderItem={renderComment}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>

//       {/* Logout */}
//       <TouchableOpacity style={styles.logoutButton}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa' },
//   header: { alignItems: 'center', paddingVertical: 40, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
//   profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
//   name: { fontSize: 22, fontWeight: 'bold' },
//   email: { fontSize: 14, color: '#888' },
//   section: { flex: 1, padding: 20 },
//   sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 15, color: '#222', textTransform: 'uppercase' },
//   commentCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#007AFF', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
//   postReference: { fontSize: 12, fontWeight: 'bold', color: '#007AFF', marginBottom: 4 },
//   commentText: { fontSize: 14, color: '#444', fontStyle: 'italic' },
//   logoutButton: { backgroundColor: '#fff', margin: 20, padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderWeight: 1, borderColor: '#ff4444' },
//   logoutText: { color: '#ff4444', fontWeight: 'bold' },
// });

// export default ProfileView;

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProfPic from "../../assets/images/ProfPic.png";
import { useUserContext } from "../../contexts/UserContext";

const ProfileView = () => {
  const { user } = useUserContext();

  const menuItems = [
    {
      id: "1",
      title: "Saved places",
      icon: "heart-outline",
    },
    {
      id: "2",
      title: "My trips",
      icon: "briefcase-outline",
    },
    {
      id: "3",
      title: "Settings",
      icon: "settings-outline",
    },
  ];

  const { logout } = useUserContext();

  const handelLogout = async () => {
    await logout();
    router.replace("/");
    console.log("User Logged out successfully.");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <Ionicons name={item.icon} size={22} color="#0F766E" />
        <Text style={styles.menuText}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
    </TouchableOpacity>
  );

  if (!user) {
    return <Text>Profile loading...</Text>;
  }

  const userData = {
    name: user.name,
    email: user.email,
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* PROFILE HEADER */}
      <View style={styles.header}>
        <Image source={ProfPic} style={styles.avatar} />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>

        <TouchableOpacity style={styles.editBtn}>
          <Ionicons name="create-outline" size={16} color="#0F766E" />
          <Text style={styles.editText}>Edit profile</Text>
        </TouchableOpacity>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* MENU */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.menuList}
      />

      {/* LOGOUT */}
      <TouchableOpacity onPress={handelLogout} style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    alignItems: "center",
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 10,
  },

  name: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A",
  },

  email: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#0F766E",
  },

  editText: {
    color: "#0F766E",
    fontWeight: "700",
    fontSize: 13,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },

  statBox: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F766E",
  },

  statLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
    fontWeight: "600",
  },

  menuList: {
    paddingHorizontal: 16,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    margin: 20,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#EF4444",
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "800",
    fontSize: 15,
  },
});
