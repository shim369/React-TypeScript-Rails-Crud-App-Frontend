import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { PostTypes } from "../../types/postTypes";

function PostEdit() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [errors, setErrors] = useState<string[]>([]);
  const [post, setPost] = useState<PostTypes>({
    id: 0,
    title: "",
    content: "",
    image_url: "",
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/posts/${id}`
        );
        setPost(response.data);
      } catch (error: any) {
        console.error("Error fetching post:", error);
      }
    };

    fetchData();
  }, [id]);

  const hadleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if (e.target.files && e.target.files[0]) {
      setPost({ ...post, image: e.target.files[0] });
    }
  };

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      title: post.title,
      content: post.content,
      image_url: post.image_url,
    };

    let errors: string[] = [];

    if (!data.title) {
      errors.push("Post title is required!");
    }

    if (!data.content) {
      errors.push("Post content is required!");
    }

    setErrors(errors);

    try {
      await axios.put(
        `http://127.0.0.1:5000/api/posts/${id}`, data
      );
      navigate("/");
    } catch (error: any) {
      errors.push(error.response);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="d-flex align-items-center justify-content-between m-0">
                Edit Task
                <Link to="/" className="btn btn-primary float-end">
                  Back
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={updatePost}>
                <div className="mb-3">
                  <label htmlFor="title">Post Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={hadleInput}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content">Post Content</label>
                  <input
                    type="text"
                    id="content"
                    name="content"
                    value={post.content}
                    onChange={hadleInput}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image_url">Post Image</label>
                  <input
                    type="file"
                    id="image_url"
                    name="image_url"
                    onChange={handleImageUpload}
                    className="form-control"
                  />
                </div>
                <div>
                  <ul className="text-danger">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Update Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostEdit;
