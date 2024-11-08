import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVideos,
  addNewVideo,
  updateVideo,
  deleteVideo,
} from "../redux/videoSlice";
import "./videos.css";

const MyVideo = () => {
  const dispatch = useDispatch();
  //status and error use for search
  const { videos, status, error } = useSelector((state) => state.video);
  const [searchTerm, setSearchTerm] = useState("");
  const [videoForm, setVideoForm] = useState({
    id: "",
    title: "",
    description: "",
    url: "",
    duration: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateVideo({ id: videoForm.id, updatedVideo: videoForm }));
    } else {
      dispatch(addNewVideo(videoForm));
    }
    resetForm();
  };

  const handleEdit = (video) => {
    setVideoForm(video);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteVideo(id));
  };

  const resetForm = () => {
    setVideoForm({
      id: "",
      title: "",
      description: "",
      url: "",
      duration: "",
      image: "",
    });
    setIsEditing(false);
  };

  return (
    <>
      <img
        className="header-image"
        src="images/learning_online.jpg"
        alt="Learning Online"
      />

      <div className="container mt-4">
        <h2>{isEditing ? "Edit Video" : "Add New Video"}</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            name="title"
            value={videoForm.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Description"
            name="description"
            value={videoForm.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Video URL"
            name="url"
            value={videoForm.url}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Duration"
            name="duration"
            value={videoForm.duration}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Image URL"
            name="image"
            value={videoForm.image}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Video" : "Add Video"}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
          >
            Cancel
          </button>
        </form>

        {/* Search Input Field */}
        <h2>Search Videos</h2>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {status === "loading" && <p>Loading videos...</p>}
        {status === "failed" && <p>Error: {error}</p>}

        <div className="row">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onEdit={() => handleEdit(video)}
                onDelete={() => handleDelete(video.id)}
              />
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </div>
    </>
  );
};

const VideoCard = ({ video, onEdit, onDelete }) => (
  <div className="col-md-6 mb-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{video.title}</h5>
        <p className="card-text">{video.description}</p>
        <iframe
          className="video-iframe"
          src={video.url}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="card-footer">
        <h6>Comments</h6>
        <ul>
          {video.comments.length > 0 ? (
            video.comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.user}</strong>: {comment.text}
              </li>
            ))
          ) : (
            <li>No comments</li>
          )}
        </ul>
        <button className="btn btn-warning me-2" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default MyVideo;
