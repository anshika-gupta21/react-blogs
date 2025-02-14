import React, { useState, useEffect } from "react";
import { Container, Postcard } from "../components/index.js";
import appwriteService from "../appwrite/configuration.js";

function AllPosts() {
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);


  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
export default AllPosts;
