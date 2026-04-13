import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Questions from './Questions';
import StartTest from './test/StartTest';
import HomePage from './HomePage';
import NotFound from './NotFound';
import NavBar from './NavBar';
import AdminLogin from './admin/AdminLogin';

function MainPage() {

  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/training" element={<Questions />} />
          <Route path="/test" element={<StartTest />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default MainPage
