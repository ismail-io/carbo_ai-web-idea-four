import React, { useEffect, useState, useCallback } from 'react';
import { ChevronDown, Leaf, Calculator, Map, Users, Car, ShoppingBag } from 'lucide-react';
import { Alert, AlertDescription } from '../@/components/ui/alert';
import NewsCard from './NewsCard';
import ImageProcess from './ImageProcess';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FootprintCursor from './FootprintCursor';
import landing from '../images/land2.png';

const Dashboard = () => {
  const [openSections, setOpenSections] = useState({
    co2: false,
    co2eq: false,
    renewable: false,
    credits: false,
    offsetting: false
  });
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Sustainability-related search terms
  const searchQueries = [
    'carbon footprint',
    'sustainability',
    'renewable energy',
    'climate change',
    'green technology',
    'environmental impact'
  ];

  const getNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const randomQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];
      const response = await fetch(
        `https://newsapi.org/v2/everything?` +
        `q=${encodeURIComponent(`${randomQuery} AND (science OR health OR Carbon OR Green Energy)`)}&` +
        `language=en&` +
        `sortBy=publishedAt&` +
        `apiKey=e86917b14c1fdef9550adea04596ca04`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      
      if (data.articles && data.articles.length > 0) {
        const filteredArticles = data.articles
          .filter(article => 
            article.title && 
            article.description && 
            article.urlToImage &&
            !article.title.toLowerCase().includes('[removed]') &&
            !article.description.toLowerCase().includes('[removed]')
          )
          .slice(0, 6);
        
        setNews(filteredArticles);
      } else {
        setError('No articles found for the current search.');
      }
    } catch (err) {
      setError(`Failed to load news: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [searchQueries]);

  useEffect(() => {
    getNews();
  }, [getNews]);

  const sections = [
    {
      id: 'co2',
      title: 'What is CO2?',
      content: 'Carbon dioxide (CO2) is a greenhouse gas that occurs naturally in the atmosphere. Human activities, particularly burning fossil fuels, have significantly increased CO2 levels, contributing to climate change.',
      fullWidth: false
    },
    {
      id: 'co2eq',
      title: 'CO2 Equivalent (CO2eq)',
      content: 'CO2 equivalent is a metric used to compare the warming potential of different greenhouse gases. It expresses the impact of various gases in terms of the amount of CO2 that would have the same warming effect.',
      fullWidth: false
    },
    {
      id: 'renewable',
      title: 'Renewable Energy Sources',
      content: 'Renewable energy comes from natural sources that replenish themselves, such as solar, wind, hydroelectric, and geothermal power. These sources produce little to no greenhouse gas emissions.',
      fullWidth: false
    },
    {
      id: 'credits',
      title: 'Carbon Credits',
      content: 'Carbon credits are certificates that represent the reduction of one metric ton of CO2 from the atmosphere. They can be bought and sold as part of carbon trading schemes to offset emissions.',
      fullWidth: false
    },
    {
      id: 'offsetting',
      title: 'Carbon Offsetting Programs',
      fullWidth: true,
      content: (
        <div className="space-y-6">
          <iframe
            src="https://ourworldindata.org/grapher/co-emissions-per-capita"
            title="CO2 emissions per capita"
            className="w-full h-[600px] border-0 rounded-lg"
          />
          <iframe
            src="https://ourworldindata.org/grapher/carbon-dioxide-co2-emissions-by-sector-or-source"
            title="CO2 emissions by sector or source"
            className="w-full h-[600px] border-0 rounded-lg"
          />
          <img
            src="https://ourworldindata.org/uploads/2018/04/Greenhouse-gas-emission-scenarios-01.png"
            alt="Greenhouse gas scenarios"
            className="w-full rounded-lg"
          />
        </div>
      )
    }
  ];

  const actionCards = [
    {
      title: 'ECO CENTER',
      text: 'Dive into our Eco Center to discover a wealth of knowledge about eco-friendly practices, sustainable living, and environmental initiatives.',
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      path: '/eco-center',
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'CALCULATOR',
      text: 'Use our Calculator to estimate your carbon footprint and get personalized tips to reduce emissions.',
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      path: '/calculator',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'MAP',
      text: 'Explore our interactive Map to locate eco-friendly destinations, recycling centers, and green spaces near you.',
      icon: <Map className="w-8 h-8 text-purple-600" />,
      path: '/map',
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'CARPOOL',
      text: 'Join our Carpool initiative to connect with others and reduce carbon emissions through shared transportation.',
      icon: <Car className="w-8 h-8 text-orange-600" />,
      path: '/carpool',
      color: 'from-orange-400 to-orange-600'
    },
    {
      title: 'COMMUNITY',
      text: 'Become part of a growing Community of eco-conscious individuals sharing experiences and collaborating on projects.',
      icon: <Users className="w-8 h-8 text-pink-600" />,
      path: '/community',
      color: 'from-pink-400 to-pink-600'
    },
    {
      title: 'SHOPPING',
      text: 'Discover sustainable shopping options and track the environmental impact of your purchases.',
      icon: <ShoppingBag className="w-8 h-8 text-teal-600" />,
      path: '/shopping',
      color: 'from-teal-400 to-teal-600'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const heroTextVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const renderSection = (section) => (
    <div 
      key={section.id} 
      className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${section.fullWidth ? 'col-span-full' : ''}`}
    >
      <button
        onClick={() => toggleSection(section.id)}
        className="group relative w-full text-left"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-semibold text-gray-800">{section.title}</span>
          <ChevronDown 
            className={`w-5 h-5 text-blue-600 transform transition-transform ${openSections[section.id] ? 'rotate-180' : ''}`} 
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </button>
      {openSections[section.id] && (
        <div className="mt-4 text-gray-600 leading-relaxed">
          {typeof section.content === 'string' ? <p>{section.content}</p> : section.content}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <FootprintCursor />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative container mx-auto px-4 py-16 flex items-center justify-between gap-8 flex-col lg:flex-row"
        >
          {/* Text Section */}
          <motion.div 
            variants={itemVariants}
            className="flex-1 text-center lg:text-left"
          >
            <motion.h1 
              variants={heroTextVariants}
              className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
            >
              Track Today, 
              <br />
              Sustain Tomorrow.
            </motion.h1>
            
            <motion.h3 
              variants={heroTextVariants}
              className="text-xl lg:text-2xl font-medium mb-8 text-gray-600"
            >
              Shrink Your Footprint to Grow Your Impact
            </motion.h3>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/calculator">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Get Started
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            variants={imageVariants}
            className="flex-1 flex justify-center"
          >
            <img
              src={landing}
              alt="Environmental sustainability"
              className="max-w-full h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Action Cards Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Explore Our Features
        </motion.h2>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {actionCards.map((card, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link to={card.path}>
                <div className="bg-white rounded-xl shadow-lg p-6 h-full hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Information Sections */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Learn About Sustainability
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map(renderSection)}
        </div>
      </div>

      {/* News Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Latest Environmental News
        </motion.h2>
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading news...</p>
          </div>
        )}
        
        {error && (
          <Alert className="max-w-2xl mx-auto mb-8 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              {error}
              <button 
                onClick={getNews}
                className="ml-2 text-blue-600 hover:text-blue-800 underline"
              >
                Try again
              </button>
            </AlertDescription>
          </Alert>
        )}
        
        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        )}
      </div>

      {/* Image Processing Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Analyze Your Carbon Footprint
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <ImageProcess />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;