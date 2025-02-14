import React from "react";
import appwriteService from "../appwrite/configuration.js";
import { Link } from "react-router-dom";

function Postcard({ $id, title, featuredImage }) {
  // const imageUrl = appwriteService.getFilePreview(featuredImage);
  // if (imageUrl) {
  //   console.log("Image Preview URL:", imageUrl);
  // } else {
  //   console.log("Failed to generate image preview.");
  // }
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full rounded-xl p-4 bg-gray-100">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
    </Link>
  );
}

export default Postcard;
