import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration.js";
import { Button, Container } from "../components";
import parse from "html-react-parser"; // Import parse function

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService
      .deletePost(post.$id)
      .then((status) => {
        if (status) {
          appwriteService
            .deleteFile(post.featuredImage)
            .then((fileDeleted) => {
              if (fileDeleted) {
                console.log("Post and file deleted successfully.");
                navigate("/");
              } else {
                console.log("Failed to delete file.");
              }
            })
            .catch((error) => {
              console.log("Error deleting file:", error);
            });
        } else {
          console.log("Failed to delete post.");
        }
      })
      .catch((error) => {
        console.log("Error deleting post:", error);
      });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="mr-3 hover:cursor-pointer"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                className="hover:cursor-pointer"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css"> {parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
