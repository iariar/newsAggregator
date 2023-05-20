import React, { useEffect, useState } from 'react';
import './dashboard.css';
import ArticleItem from '../../components/articleItem/articleItem';
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Sidebar from '../../components/sidebar/sidebar';


const Dashboard = () => {
  const { user, token, setUser, setToken } = useStateContext();
  const [articles, setArticles] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState(user.authors || []);
  const [selectedSources, setSelectedSources] = useState(user.sources || []);
  const [articleAuthors, setArticleAuthors] = useState([]);
  const [articleSources, setArticleSources] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [savedPreferences, setSavedPreferences] = useState({ selectedAuthors: [], selectedSources: [] });
  const [page, setPage] = useState(1); // Current page for pagination
  const [hasMore, setHasMore] = useState(true); // Indicates if there are more articles to load
  const pageSize = 9;

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const fetchArticles = async () => {
    try {
      const response = await axiosClient.get('getArticles', {
        params: { page, per_page: pageSize },
      });

      if (response.data.data.length === 0) {
        setHasMore(false); // No more articles to load
      } else {
        setArticles(prevArticles => [...prevArticles, ...response.data.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const authors = articles.map(article => article.author);
    const uniqueAuthors = [...new Set(authors)];
    setArticleAuthors(uniqueAuthors);

    const sources = articles.map(article => article.source);
    const uniqueSources = [...new Set(sources)];
    setArticleSources(uniqueSources);
  }, [articles]);


  // const apiUrl = `http://localhost:3002/articles`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosClient.get('getArticles');
        setArticles(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const authors = articles.map(article => article.author);
    const uniqueAuthors = [...new Set(authors)];
    setArticleAuthors(uniqueAuthors);

    const sources = articles.map(article => article.source);
    const uniqueSources = [...new Set(sources)];
    setArticleSources(uniqueSources);
  }, [articles]);

  const handleFilterChange = (event) => {
    const keyword = event.target.value;
    setFilterKeyword(keyword);
  };
  
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleAuthorChange = (event) => {
    const author = event.target.value;
    if (selectedAuthors.includes(author)) {
      setSelectedAuthors(selectedAuthors.filter((selectedAuthor) => selectedAuthor !== author));
    } else {
      setSelectedAuthors([...selectedAuthors, author]);
    }
  };

  const handleSourceChange = (event) => {
    const source = event.target.value;
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter((selectedSource) => selectedSource !== source));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
  };

  const filteredArticles = articles.filter(
    (article, index, self) =>
      article.title.toLowerCase().includes(filterKeyword.toLowerCase()) &&
      (selectedAuthors.length === 0 || selectedAuthors.includes(article.author)) &&
      (selectedSources.length === 0 || selectedSources.includes(article.source)) &&
      (!selectedDate || (article.published_at && article.published_at.substring(0, 10) === selectedDate)) &&
      self.findIndex((a) => a.title === article.title) === index
  );

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date || ''); // Set an empty string if date is falsy (undefined, null, empty)
  };

  const handleSavePreferences = () => {
    const preferences = {
      selectedAuthors,
      selectedSources,
    };
    setSavedPreferences(preferences);
    axiosClient.post('/save', preferences)
      .then(response => {
        // Handle the response if needed
        console.log('Preferences saved successfully.');
      })
      .catch(error => {
        // Handle the error if needed
        console.error('Failed to save preferences:', error);
      });
  };

  useEffect( () => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
    
  }, [])

  const logout = (event) => {
    event.preventDefault()

    axiosClient.post('/logout')
    .then(() => {
      setToken(null)
      setUser({})
    })
  }

  if (!token)
  {
    return <Navigate to='/'/>
  }
  

  return (
    <div className="dashboard-container">
      <div className="filter-container">
        <input
          className="dashboard-input"
          type="text"
          placeholder="Filter articles"
          value={filterKeyword}
          onChange={handleFilterChange}
        />
      </div>
      <div className="articles-container">
        {filteredArticles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
        {hasMore && (
          <button className="load-more" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
      <Sidebar
        user={user}
        articleAuthors={articleAuthors}
        selectedAuthors={selectedAuthors}
        handleAuthorChange={handleAuthorChange}
        articleSources={articleSources}
        selectedSources={selectedSources}
        handleSourceChange={handleSourceChange}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        handleSavePreferences={handleSavePreferences}
        logout={logout}
      />
      </div>

    
  );
};



export default Dashboard;