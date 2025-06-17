import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import BlogList from './pages/BlogList';
import ArticleDetail from './pages/ArticleDetail';

function App() {
  return (
    <MainLayout>
      <Routes>
        {/* route handle ketika blog app sebagai stadalone app -> localhost:5006 */}
        <Route path="/" element={<BlogList />} />
        {/* route handle ketika blog app sebagai microapp -> localhost:5000 di shell /blog*/}
        <Route path="/blog" element={<BlogList />} />
        {/*  route keetika detai Artikel diakses standalone -> localhost:5006/artcile/12 */}
        <Route path="/article/:id" element={<ArticleDetail />} />
        {/* route handle ketika detail artikel diakses lewa shellapp -> localhost:5000/blog/article/15 */}
        <Route path="/blog/article/:id" element={<ArticleDetail />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

/*
Shell App (localhost:5000)
├── /blog/*           → Load blog microfrontend
    ├── /blog         → Route #2 (BlogList)
    └── /blog/article/123 → Route #4 (ArticleDetail)

Blog App Standalone (localhost:5006)
├── /                 → Route #1 (BlogList)
└── /article/123      → Route #3 (ArticleDetail)
*/