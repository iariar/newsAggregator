import './App.css';
import GoogleFontLoader from 'react-google-font-loader';


function App() {
  return (
    <div className="App">
      <GoogleFontLoader
        fonts={[
          {
            font: 'Brawler',
            weights: [400, 700],
          }, 
          {
            font: 'Poppins',
            weights: [500, 700],
          },
        ]}
      />
    </div>
  );
}

export default App;
