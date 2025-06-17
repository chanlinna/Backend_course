import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesByJournalistId } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function JournalistArticlesPage() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getArticlesByJournalistId(id);
        setArticles(data);
        setError("");
      } catch (err) {
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{ articles[0]?.journalistName}</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> —{" "}
            <button onClick={() => navigate(`/articles/${article.id}`)}>
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
