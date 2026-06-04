import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalist, setJournalist] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectCate, setSelectCate] = useState("");
  const [selectJournal, setSelectJournal] = useState("");

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  useEffect(() => {fetchArticles()}, [selectCate, selectJournal]);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get("http://localhost:3000/articles");
      const categoryID = parseInt(selectCate) || 0;
      const journalistID = parseInt(selectJournal) || 0;
      if (categoryID === 0 && journalistID === 0) setArticles(res.data);
      else if (categoryID === 0)
        setArticles(
          res.data.filter((item) => item.journalistId === journalistID),
        );
      else if (journalistID === 0)
        setArticles(res.data.filter((item) => item.categoryId === categoryID));
      else
        setArticles(res.data.filter((item) => item.categoryId === categoryID && item.journalistId === journalistID));
    } catch (error) {
      console.error("Error fetch article:", error.respones.data);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try {
      const res = await axios.get("http://localhost:3000/journalists");
      setJournalist(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Erorr fetch :", error.respones.data);
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await axios.get("http://localhost:3000/categories");
      console.log(res.data);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetch categories:", error.respones.data);
    }
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter">
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalist.map((item)=>(<option key={item.id} value={String(item.id)}>{item.name}</option>))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter">
          <option value="">All Categories</option>
          {/* Options for categories */}
           {categories.map((item)=>(<option key={item.id} value={item.id}>{item.name}</option>))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            const option1 = document.getElementById("journalistFilter");
            const option2 = document.getElementById("categoryFilter")
            setSelectJournal(option1.value);
            setSelectCate(option2.value);
          }}
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            // Logic to reset filters
            const option1 = document.getElementById("journalistFilter");
            const option2 = document.getElementById("categoryFilter")
            option1.value = option2.value = '';
            setSelectJournal(option1.value);
            setSelectCate(option2.value);
          }}
        >
          Reset Filters
        </button>
      </div>

      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>
              By Journalist #{article.journalistId} | Category #
              {article.categoryId}
            </small>
            <br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
