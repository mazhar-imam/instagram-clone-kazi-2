import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import BottomTabs, { bottomTabIcons } from "../components/home/BottomTabs";
import Header from "../components/home/Header";
import Posts from "../components/home/Posts";
import Stories from "../components/home/Stories";
import { POSTS } from "../data/posts";
import {
  db,
  collectionGroup,
  onSnapshot,
  query,
  orderBy,
  auth,
  getDoc,
  doc,
} from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [icons, setIcons] = useState(bottomTabIcons);

  const getProfilePicture = async () => {
    const collRef = collection(db, "users");
    const docRef = doc(collRef, auth.currentUser.email);
    try {
      const profilePicSnap = await getDoc(docRef);
      const profile = profilePicSnap.data().profile_picture;
      setIcons([
        ...bottomTabIcons,
        {
          name: "Profile",
          active: profile,
          inactive: profile,
        },
      ]);
    } catch (err) {
      console.log("Error getting Profile pic from firebase ", err);
    }
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

  useEffect(() => {
    const collGroupRef = collectionGroup(db, "posts");
    const qResult = query(collGroupRef, orderBy("createdAt", "desc"));
    onSnapshot(qResult, (snapshot) => {
      setPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })));
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <View style={{ paddingBottom: 270 }}>
        <ScrollView>
          {posts.map((post, index) => (
            <Posts key={index} post={post} />
          ))}
        </ScrollView>
      </View>
      <BottomTabs icons={icons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "black",
  },
});

export default HomeScreen;
