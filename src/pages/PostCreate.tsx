import { useState } from "react";
import { PostTypes } from "../../types/postTypes";
import axios from "axios";
import { Link } from "react-router-dom";

function PostCreate() {
  const [errors, setErrors] = useState<string[]>([]);
  const [post, setPost] = useState<PostTypes>({
    id: 0,
    title: "",
    content: "",
    image_url: "",
    image: null,
  });

  const hadleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.persist();
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if (e.target.files && e.target.files[0]) {
      setPost({ ...post, image: e.target.files[0] });
    }
  };

  const savePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    if (post.image) {
      formData.append("image", post.image);
    }

    let errors: string[] = [];

    if (!formData.get("title")) {
      errors.push("Post title is required!");
    }

    if (!formData.get("content")) {
      errors.push("Post content is required!");
    }

    if (errors.length === 0) {
      try {
        await axios.post("http://127.0.0.1:5000/api/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setPost({
          id: 0,
          title: "",
          content: "",
          image_url: "",
          image: null,
        });
      } catch (error: any) {
        errors.push(error.response);
      }
    }

    setErrors(errors);
  };

  return (
    <main>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="d-flex align-items-center justify-content-between m-0">
                  Create Post
                  <Link to="/" className="btn btn-primary float-end">
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
              <form onSubmit={savePost}>
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
                  <textarea
                    id="content"
                    name="content"
                    value={post.content}
                    onChange={hadleInput}
                    className="form-control"
                  ></textarea>
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
                  {errors.length > 0 && (
                    <ul className="alert alert-danger p-2" role="alert">
                      {errors.map((error, index) => (
                        <li className="ps-2" key={index}>
                          {error}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Save Post
                  </button>
                </div>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default PostCreate;
