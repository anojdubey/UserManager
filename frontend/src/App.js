import './App.css';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EditUsers from './pages/EditUsers';
import ViewPage from './pages/ViewPage';

function App() {
  const user = useSelector((state) => state.user.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manageUsers" element={<EditUsers />} />
        <Route path="/viewUsers/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
