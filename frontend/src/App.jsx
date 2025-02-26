import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
// import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
      </Routes>
    </Router>
  );
}

export default App;