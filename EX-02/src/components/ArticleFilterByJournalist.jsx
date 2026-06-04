import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [selectJournal, setSelectJournal] = useState('');

  const [journalist, setJournalist] = useState([]);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  useEffect(
    ()=>{
      fetchArticles();
    }, [selectJournal]
  )

  const fetchArticles = async () => {
    // Fetch articles from the API
    const option = document.getElementById('journalistFilter')
    try{
      const res = await axios.get('http://localhost:3000/articles');
      const journalistID = parseInt(option.value) || 0;
      if(journalistID === 0) setArticles(res.data);
      else setArticles(res.data.filter((item)=>item.journalistId === journalistID));
    }
    catch (error){
      console.error("Error fetch article:", error.respones.data);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try{
      const res = await axios.get('http://localhost:3000/journalists')
      setJournalist(res.data);
      console.log(res.data)
    }
    catch(error){
      console.error("Erorr fetch :", error.respones.data)
    }
    
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter">
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalist.map((item)=>(<option key={item.id} value={String(item.id)}>{item.name}</option>))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            const option = document.getElementById("journalistFilter");
            console.log(option.value);
            setSelectJournal(option.value);
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            const option = document.getElementById("journalistFilter");
            option.value = '';
            setSelectJournal(option.value);
            
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