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
    <Card style={{ width: "30%" }} className="mb-5">
      <Card.Img
        variant="top"
        src={post.image_url ? post.image_url : defaultImageUrl}
        className="img-detail"
        alt={post.title}
      />
      <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
          <Link to={`/posts/${post.id}`}>
              <Button variant="primary">Detail</Button>
          </Link>
      </Card.Body>
    </Card>
  );
}

export default CardBase;
