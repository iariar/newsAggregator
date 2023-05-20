import React from 'react';

const Sidebar = ({
  user,
  articleAuthors,
  selectedAuthors,
  handleAuthorChange,
  articleSources,
  selectedSources,
  handleSourceChange,
  selectedDate,
  handleDateChange,
  handleSavePreferences,
  logout,
}) => {
  return (
    <div className="sidebar">
      <h2>Hello {user.name}</h2>
      <div className="filters">
        <p>Filter by author:</p>
        <ul className="list">
          <li>
            <label>
              <input
                className="dashboard-input"
                type="checkbox"
                value="All"
                checked={selectedAuthors.length === 0}
                onChange={handleAuthorChange}
              />
              All
            </label>
          </li>
          {articleAuthors.map((author, index) => (
            <li key={index}>
              <label className="checkbox-label">
                <input
                  className="dashboard-input"
                  type="checkbox"
                  value={author}
                  checked={selectedAuthors.includes(author)}
                  onChange={handleAuthorChange}
                />
                <span className="checkbox-text">{author}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="filters">
        <p>Filter by source:</p>
        <ul className="list">
          <li>
            <label>
              <input
                className="dashboard-input"
                type="checkbox"
                value="All"
                checked={selectedSources.length === 0}
                onChange={handleSourceChange}
              />
              All
            </label>
          </li>
          {articleSources.map((source, index) => (
            <li key={index}>
              <label>
                <input
                  className="dashboard-input"
                  type="checkbox"
                  value={source}
                  checked={selectedSources.includes(source)}
                  onChange={handleSourceChange}
                />
                {source}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="filters">
        <p>Filter by date:</p>
        <input
          className="dashboard-input"
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="buttons">
        <button className="save" onClick={handleSavePreferences}>
          Save Preferences
        </button>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;