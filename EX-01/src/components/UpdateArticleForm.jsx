import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });

  const {id} = useParams();
  const navigate = useNavigate();
  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    const fetchData = async (id) => {
      try{
        const res = await axios.get(`http://localhost:3000/articles/${id}`)
        setForm(res.data);
      }
      catch(error){
        console.error(`Error for fetch data: ${error}`)
      }
    }

    fetchData(id)
    
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, form) => {
    e.preventDefault();
    // Update article with axios
    try{
        const res = await axios.put(`http://localhost:3000/articles/${id}`, form);
        console.log(res.data);
        alert(res.data);
        navigate("/");
    }
    catch(error){
        console.error("Error update:", error.respones.data);
    }
  };

  return (
    <form onSubmit={(e)=>handleSubmit(e, form)}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
