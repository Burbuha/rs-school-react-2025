import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import UncontrolledForm from './pages/UncontrolledForm/UncontrolledForm.tsx';
import HookForm from './pages/HookForm/HookForm';
import { Sidebar } from './components/Sidebar/Sidebar';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <Sidebar />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
          <Route path="/hook-form" element={<HookForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
