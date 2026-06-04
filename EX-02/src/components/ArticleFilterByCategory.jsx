import axios from 'axios';
import { use, useEffect, useState } from 'react';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  
  const [categories, setCategories] = useState([]);
  const [selectCate, setSelectCate] = useState('');

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  // when selectcate update need to featch data again
  useEffect(()=>{
    fetchArticles();
  }, [selectCate])

  

  const fetchArticles = async () => {
    // Fetch articles from the API
    const option = document.getElementById('categoryFilter')
    try{
      const res = await axios.get('http://localhost:3000/articles');
      const categoryID = parseInt(option.value) || 0;
      
      if(categoryID === 0 ) setArticles(res.data);
      else setArticles(res.data.filter((item)=>item.categoryId === categoryID ));
    }
    catch (error){
      console.error("Error fetch article:", error.respones.data);
    }

  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try{
      const res = await axios.get('http://localhost:3000/categories');
      console.log(res.data);
      setCategories(res.data);
    }
    catch(error){
      console.error("Error fetch categories:", error.respones.data)
    }
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter">
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map((item)=>(<option key={item.id} value={item.id}>{item.name}</option>))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            const option = document.getElementById('categoryFilter')
            setSelectCate(option.value);

            
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            const option = document.getElementById('categoryFilter');
            option.value = '';
            setSelectCate('');
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}