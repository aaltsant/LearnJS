import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Questions from './Questions';
import HomePage from './HomePage';
import NotFound from './NotFound';
import NavBar from './NavBar';

function MainPage() {

    return (
        <>
            <NavBar />
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/training" element={<Questions />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default MainPage
