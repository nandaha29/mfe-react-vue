// ArticleDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../types';
import { getArticleById, getArticles } from '../services/api-simple'; 

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticleData = async () => {
      if (!id) {
        setError('No article ID provided');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch article data
        const articleData = await getArticleById(id);
        
        if (!articleData) {
          setError('Article not found');
          setLoading(false);
          return;
        }
        
        setArticle(articleData);
        
        // Fetch related articles
        const allArticles = await getArticles();
        
        if (allArticles && allArticles.length > 0) {
          const related = allArticles
            .filter(a => a.id.toString() !== id)
            .slice(0, 3);
          
          setRelatedArticles(related);
        }
        
      } catch (error) {
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticleData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
        <p className="text-gray-600 mb-6">{error || 'The article you\'re looking for doesn\'t exist.'}</p>
        <Link 
          to="/blog" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link to="/blog" className="text-blue-600 hover:text-blue-800">
          Blog
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-500">{article.category}</span>
      </nav>

      {/* Hero Image */}
      <div className="relative mb-8">
        <div 
          className="h-96 bg-cover bg-center relative rounded-lg overflow-hidden"
          style={{ backgroundImage: `url(${article.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-blue-600/60"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
            <p className="text-blue-100">
              {article.publishedAt && new Date(article.publishedAt).toLocaleDateString()} 
              {article.author && ` by ${article.author}`}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div className="text-gray-700 leading-relaxed mb-6">
          <p className="text-xl">{article.description}</p>
        </div>
        
        {article.content && (
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        )}
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Link 
                key={relatedArticle.id}
                to={`/blog/article/${relatedArticle.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {relatedArticle.category}
                    </span>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {relatedArticle.description}
                    </p>
                    <span className="text-xs text-gray-500">{relatedArticle.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ArticleDetail;