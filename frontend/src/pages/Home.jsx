import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Zap, Shield, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center -mt-16 pt-16">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm font-medium mb-8">
          <Zap className="w-4 h-4" />
          Powered by Machine Learning
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Predict the Future of <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-green to-blue-500">
            Stock Markets
          </span>
        </h1>
        
        <p className="mt-4 text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Leverage advanced algorithms including LSTM and Random Forest to forecast 
          market trends with precision. Data driven insights at your fingertips.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/predict" className="btn-primary text-lg flex items-center justify-center gap-2 px-8 py-4">
            Start Predicting <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/dashboard" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2">
            View Dashboard <BarChart2 className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Feature grid */}
      <div className="max-w-6xl mx-auto px-4 mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20 w-full z-10">
        <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
          <p className="text-gray-400 leading-relaxed">
            Access historical and real-time data from major global stock exchanges to inform your predictions.
          </p>
        </div>
        
        <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-accent-green" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Deep Learning</h3>
          <p className="text-gray-400 leading-relaxed">
            Utilize state-of-the-art LSTM neural networks that capture long-term dependencies in time-series data.
          </p>
        </div>

        <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Risk Analysis</h3>
          <p className="text-gray-400 leading-relaxed">
            Evaluate models via rigorous metrics like RMSE and R² to understand confidence intervals.
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
