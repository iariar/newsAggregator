import React from 'react';
import './articleItem.css'

const ArticleItem = ({ article }) => {
  return (
    <div className="article-item" onClick={() => window.open(article.link, '_blank')}>
      <div className="image-container">
        <img src={article.image} alt={article.title} />
      </div>
      <div className="content-container">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
      </div>
    </div>
  );
};
export default ArticleItem;