// import { Ionicons } from '@expo/vector-icons';
// import { Tabs, useRouter } from 'expo-router';
// import { StyleSheet } from 'react-native';

// const TabsLayout = () => {

//   const router = useRouter();
//   return (
//     <Tabs screenOptions={{headerShown: false}}  >

//         <Tabs.Screen name="Destinations" options={{title:"Places", headerShown: false, tabBarIcon: ({focused}) => (
//             <Ionicons
//                 name={focused ? "map" : "map-outline"}
//                 size={24}
//                 color={focused ? "#007AFF" : "#999"}
//             />
//         )}} />

//         <Tabs.Screen name="Search" options={{title:"Search", headerShown: false, tabBarIcon: ({focused}) => (
//             <Ionicons
//                 name={focused ? "search" : "search-outline"}
//                 size={24}
//                 color={focused ? "#007AFF" : "#999"}
//             />
//         )}} />

//         <Tabs.Screen name="MyTrip" options={{title:"My Trip", headerShown: false, tabBarIcon: ({focused}) => (
//             <Ionicons
//                 name={focused ? "briefcase" : "briefcase-outline"}
//                 size={24}
//                 color={focused ? "#007AFF" : "#999"}
//             />
//         )}} />

//         <Tabs.Screen name="Profile" options={{title:"Profile", headerShown: false, tabBarIcon: ({focused}) => (
//             <Ionicons
//                 name={focused ? "person" : "person-outline"}
//                 size={24}
//                 color={focused ? "#007AFF" : "#999"}
//             />
//         )}} />

//         {/* not hiding tabs for dashboard to enable navigation */}
//         <Tabs.Screen name='dashboard' options={{href: null}} />

//         {/* this is for details page. href null to hide from tab bar, and headerLeft for back button */}
//         {/* <Tabs.Screen name="dashboard/DetailsPage" options={{title: "Details", headerShown: true, href: null, headerLeft: () => (
//             <Ionicons
//                 name="chevron-back"
//                 size={28}
//                 style={{ marginLeft: 15 }}
//                 onPress={() => router.back()}
//             />
//         )}} />
//         <Tabs.Screen name="dashboard/GalleryPage" options={{title: "Gallery", headerShown: true, href: null, headerLeft: () => (
//             <Ionicons
//                 name="chevron-back"
//                 size={28}
//                 style={{ marginLeft: 15 }}
//                 onPress={() => router.back()}
//             />
//         )}} /> */}

//     </Tabs>
//   )
// }

// export default TabsLayout

// const styles = StyleSheet.create({})

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0F766E",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="Destinations"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Search"
        options={{
          title: "Discover",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="MyTrip"
        options={{
          title: "Saved",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
