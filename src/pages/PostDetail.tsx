import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { PostTypes } from "../../types/postTypes";

function PostDetail() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [post, setPost] = useState<PostTypes>({
    id: 0,
    title: "",
    content: "",
    image_url: "",
    image: null,
  });
  const defaultImageUrl = "../logo512.png";

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Delete this post?")) {
      axios
        .delete(`http://127.0.0.1:5000/api/posts/${post.id}`)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 m-auto">
            <h2>{post.title}</h2>
            <div>
              <img
                src={post.image_url ? post.image_url : defaultImageUrl}
                alt={post.title}
                className="w-100"
              />
            </div>
            <p>{post.content}</p>
            <Link to={`/posts/${post.id}/edit`} className="btn btn-success">Edit</Link>
            <button className="btn btn-danger ms-1" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PostDetail;
