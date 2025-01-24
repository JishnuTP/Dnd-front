import React, { useState, useContext, useEffect } from "react";
import { mainContext } from "../../context/mainContex";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../component/Header";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { BiShareAlt } from "react-icons/bi";
import { API_BASE_URL } from "../../utils/api";

const Feed = () => {
  const { user,token } = useContext(mainContext);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [displayedFeeds, setDisplayedFeeds] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/feeds`); // Replace with your backend API
        setFeeds(response.data);
        setDisplayedFeeds(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching feeds:", error);
      }
    };
    fetchFeeds();
  }, []);

  const handleImageUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload"); // Replace with your Cloudinary preset

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/duquyq1yz/image/upload",
          formData
        );
        setImageUrl(res.data.secure_url);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (imageUrl && caption) {
      const newFeed = { imageUrl, caption, userId: user._id };

      try {
        const response = await axios.post(
         `${API_BASE_URL}/feeds`,
          newFeed,{
            headers: {
              Authorization: `Bearer ${token}` 
            }
          }
        );
        alert("Feed added successfully!");
        setFeeds([response.data, ...feeds]);
        setCaption("");
        setImageUrl(null);
        setDisplayedFeeds([response.data, ...displayedFeeds.slice(0, 5)]); // Update displayed feeds to show the new one
      } catch (error) {
        console.error("Error adding feed:", error);
        alert("Error adding feed!");
      }
    }
  };

  const handleShowMore = () => {
    const newDisplayedFeeds = feeds.slice(displayedFeeds.length, displayedFeeds.length + 6);
    setDisplayedFeeds([...displayedFeeds, ...newDisplayedFeeds]);
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-blue-500 via-white to-green-400 min-h-screen p-4">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8">
     
          <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              Create a Feed
            </h2>
            {user ? (
              <>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2 transition-all"
                >
                  <FaCloudUploadAlt className="text-xl" />
                  {imageUrl ? "Change Image" : "Upload Image"}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                {loading && (
                  <p className="text-blue-500 mt-2">Uploading image...</p>
                )}
                {imageUrl && (
                  <div className="mt-4">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="rounded-lg shadow-md w-full max-h-60 object-cover"
                    />
                  </div>
                )}

                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  className="w-full p-3 border rounded-lg mt-4 mb-4"
                />

                <button
                  onClick={handleSubmit}
                  className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-all"
                >
                  Post Feed
                </button>

                <Link to="/profile" className="mt-4 inline-block text-purple-600">
                  Go to Profile
                </Link>
              </>
            ) : (
              <p className="text-gray-500">Loading user details...</p>
            )}
          </div>

         
          <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-lg p-2">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Recent Feeds</h2>
            {feeds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
                {displayedFeeds.map((feed, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    <img
                      src={feed.imageUrl}
                      alt="Feed"
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                    <p className="text-lg font-semibold">{feed.caption}</p>
                    <p className="text-sm text-gray-500">
                      By: {feed.userName || "Anonymous"}
                    </p>
                    <div className="flex justify-between mt-2 text-xl text-gray-600">
                      <AiOutlineHeart className="cursor-pointer hover:text-red-500 transition" />
                      <AiOutlineComment className="cursor-pointer hover:text-blue-500 transition" />
                      <BiShareAlt className="cursor-pointer hover:text-green-500 transition" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No feeds available</p>
            )}
            {feeds.length > displayedFeeds.length && (
              <button
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={handleShowMore}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;