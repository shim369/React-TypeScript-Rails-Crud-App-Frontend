import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { PostTypes } from "../../types/postTypes";
import { Link } from "react-router-dom";

interface CardProps {
  post: PostTypes;
}

function CardBase({ post }: CardProps) {
  const defaultImageUrl = "logo512.png";

  return (
    <div className="col-md-4 col-sm-6 p-2">
    <Card className="p-2 h-100">
      <Card.Img
        variant="top"
        src={post.image_url ? post.image_url : defaultImageUrl}
        className="img-detail"
        alt={post.title}
      />
      <Card.Body>
          <Card.Title className="mb-3">{post.title}</Card.Title>
          <Link to={`/posts/${post.id}`}>
              <Button variant="primary">Detail</Button>
          </Link>
      </Card.Body>
    </Card>
    </div>
  );
}

export default CardBase;
