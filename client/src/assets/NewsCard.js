import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../@/components/ui/card';

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg w-full bg-white text-gray-900 hover:shadow-xl">
      {article.urlToImage && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader className="space-y-0.5 p-4">
        <CardTitle className="text-sm font-semibold line-clamp-2">
          {article.title}
        </CardTitle>
        <p className="text-xs text-gray-500">
          {formatDate(article.publishedAt)}
          {article.source.name && ` • ${article.source.name}`}
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-xs line-clamp-2 text-gray-600">
          {article.description}
        </p>
        
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-xs text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          Read more →
        </a>
      </CardContent>
    </Card>
  );
};

export default NewsCard;