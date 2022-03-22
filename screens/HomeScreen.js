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
import { db, collectionGroup, onSnapshot, query, orderBy } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

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
      <BottomTabs icons={bottomTabIcons} />
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
