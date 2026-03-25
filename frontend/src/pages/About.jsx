import { Github, Users, BookOpen, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-green to-blue-500">
          About StockSight
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A machine learning powered stock price prediction system built as a major project
          at Galgotias College of Engineering & Technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Project Info */}
        <div className="glass-panel p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
            <BookOpen className="w-6 h-6 text-accent-green" />
            Project Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Title</p>
              <p className="text-lg text-white">Stock Price Prediction Model</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Institution</p>
              <p className="text-lg text-white">Galgotias College of Engineering & Technology</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Supervisor</p>
              <p className="text-lg text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                Asst. Prof. Mrs ANAM KHAN 
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Methodology Summary</p>
              <p className="text-gray-300 leading-relaxed text-sm mt-1">
                The system utilizes historical stock market data obtained via yfinance APIs. 
                Extensive Data preprocessing and feature engineering (calculating SMAs, EMAs, RSI, MACD) are performed 
                to enrich the dataset before feeding it into predictive models. The final architecture evaluates 
                and compares Linear Regression, Random Forest, and Long Short-Term Memory (LSTM) models for accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* Team & Tech Stack */}
        <div className="flex flex-col gap-8">
          <div className="glass-panel p-8 flex-1">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
              <Users className="w-6 h-6 text-blue-500" />
              Authors
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-green to-blue-500 flex items-center justify-center font-bold text-xl shadow-lg">
                  S
                </div>
                <div>
                  <h3 className="text-xl font-medium">Shiwesh Kumar Mishra</h3>
                  <p className="text-gray-400 text-sm">Frontend & ML Developer</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xl shadow-lg">
                  V
                </div>
                <div>
                  <h3 className="text-xl font-medium">Vansh Chaudhary</h3>
                  <p className="text-gray-400 text-sm">Backend Developer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <Github className="w-5 h-5 text-gray-300" />
              Machine Learning Models
            </h2>
            <div className="flex flex-wrap gap-2">
              {['Linear Regression', 'Decision Tree', 'Random Forest', 'LSTM'].map(model => (
                <span key={model} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                  {model}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default About;
