import React, { useState, useEffect } from 'react';
import { Moon, Sun, Download, Users, Check, Zap, Shield, Gift, MessageCircle, Palette, Sparkles, Heart } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('dark'); // dark, light, yellow, purple, green, blue
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [userCount, setUserCount] = useState(0);

  // Initialize theme and user count
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedCount = localStorage.getItem('userCount');
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark'); // Default to dark theme
    }
    
    if (savedCount) {
      setUserCount(parseInt(savedCount));
    }
  }, []);

  // Toggle theme (dark -> light -> yellow -> purple -> green -> blue -> dark)
  const toggleTheme = () => {
    let newTheme;
    if (theme === 'dark') {
      newTheme = 'light';
    } else if (theme === 'light') {
      newTheme = 'yellow';
    } else if (theme === 'yellow') {
      newTheme = 'purple';
    } else if (theme === 'purple') {
      newTheme = 'green';
    } else if (theme === 'green') {
      newTheme = 'blue';
    } else {
      newTheme = 'dark';
    }
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Get theme classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          bg: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
          text: 'text-gray-800',
          textSecondary: 'text-gray-600',
          textTertiary: 'text-gray-400',
          card: 'bg-white/80 backdrop-blur-sm',
          cardDark: 'bg-white',
          border: 'border-gray-200',
          input: 'bg-white border-gray-200 text-gray-800',
          button: 'bg-white text-gray-600 hover:bg-gray-100',
          accent: 'text-blue-600',
          accentHover: 'text-blue-700'
        };
      case 'yellow':
        return {
          bg: 'bg-gradient-to-br from-yellow-100 via-orange-50 to-amber-100',
          text: 'text-gray-900',
          textSecondary: 'text-gray-700',
          textTertiary: 'text-gray-600',
          card: 'bg-yellow-50/80 backdrop-blur-sm border border-yellow-200',
          cardDark: 'bg-yellow-100 border border-yellow-300',
          border: 'border-yellow-300',
          input: 'bg-yellow-50 border-yellow-300 text-gray-900',
          button: 'bg-yellow-200 text-gray-800 hover:bg-yellow-300',
          accent: 'text-orange-600',
          accentHover: 'text-orange-700'
        };
      case 'purple':
        return {
          bg: 'bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900',
          text: 'text-white',
          textSecondary: 'text-purple-200',
          textTertiary: 'text-purple-300',
          card: 'bg-purple-800/80 backdrop-blur-sm border border-purple-600',
          cardDark: 'bg-purple-800 border border-purple-600',
          border: 'border-purple-500',
          input: 'bg-purple-700 border-purple-500 text-white',
          button: 'bg-purple-700 text-purple-200 hover:bg-purple-600',
          accent: 'text-purple-300',
          accentHover: 'text-purple-200'
        };
      case 'green':
        return {
          bg: 'bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900',
          text: 'text-white',
          textSecondary: 'text-green-200',
          textTertiary: 'text-green-300',
          card: 'bg-green-800/80 backdrop-blur-sm border border-green-600',
          cardDark: 'bg-green-800 border border-green-600',
          border: 'border-green-500',
          input: 'bg-green-700 border-green-500 text-white',
          button: 'bg-green-700 text-green-200 hover:bg-green-600',
          accent: 'text-green-300',
          accentHover: 'text-green-200'
        };
      case 'blue':
        return {
          bg: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-indigo-900',
          text: 'text-white',
          textSecondary: 'text-blue-200',
          textTertiary: 'text-blue-300',
          card: 'bg-blue-800/80 backdrop-blur-sm border border-blue-600',
          cardDark: 'bg-blue-800 border border-blue-600',
          border: 'border-blue-500',
          input: 'bg-blue-700 border-blue-500 text-white',
          button: 'bg-blue-700 text-blue-200 hover:bg-blue-600',
          accent: 'text-blue-300',
          accentHover: 'text-blue-200'
        };
      default: // dark
        return {
          bg: 'bg-gray-900',
          text: 'text-white',
          textSecondary: 'text-gray-300',
          textTertiary: 'text-gray-400',
          card: 'bg-gray-800 border border-gray-700',
          cardDark: 'bg-gray-800 border border-gray-700',
          border: 'border-gray-600',
          input: 'bg-gray-700 border-gray-600 text-white',
          button: 'bg-gray-800 text-yellow-400 hover:bg-gray-700',
          accent: 'text-blue-400',
          accentHover: 'text-blue-300'
        };
    }
  };

  const themeClasses = getThemeClasses();

  // Get theme icon
  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Palette size={24} />;
      case 'yellow':
        return <Sun size={24} />;
      case 'purple':
        return <Sparkles size={24} />;
      case 'green':
        return <Heart size={24} />;
      case 'blue':
        return <Moon size={24} />;
      default:
        return <Sun size={24} />;
    }
  };

  // Download function
  const startDownload = async () => {
    if (!url.trim()) {
      setResult('<div style="color:red;">Please enter a TikTok URL</div>');
      return;
    }

    setLoading(true);
    setResult('Processing...');
    
    try {
      const res = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (data && data.data && data.data.play) {
        const downloadLink = data.data.play;
        
        // Update user count
        const newCount = userCount + 1;
        setUserCount(newCount);
        localStorage.setItem('userCount', newCount.toString());
        
        setResult(`
          <a href="${downloadLink}" download="tiktok_video.mp4" style="color:#00ffcc; font-size:1.1rem; text-decoration:none;">
            ✅ Click here if download doesn't start automatically
          </a>
        `);
        
        // Auto download with minimal delay
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = downloadLink;
          a.download = "tiktok_video.mp4";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, 500); // Reduced to 0.5 seconds
      } else {
        throw new Error("Invalid or unsupported link. Please check the URL.");
      }
    } catch (error) {
      setResult(`<div style="color:red;">Error: ${error.message}</div>`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      startDownload();
    }
  };

  // Get result background based on theme
  const getResultBg = () => {
    switch (theme) {
      case 'light':
        return 'bg-gray-50';
      case 'yellow':
        return 'bg-yellow-100';
      case 'purple':
        return 'bg-purple-700';
      case 'green':
        return 'bg-green-700';
      case 'blue':
        return 'bg-blue-700';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses.bg}`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-300 ${themeClasses.button} shadow-lg hover:shadow-xl`}
        >
          {getThemeIcon()}
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl md:text-6xl font-bold mb-4 ${themeClasses.text}`}>
            TikTok Downloader
          </h1>
          <p className={`text-xl ${themeClasses.textSecondary}`}>
            Download your favorite TikTok videos instantly
          </p>
        </div>

        {/* Main Download Section */}
        <div className={`max-w-2xl mx-auto mb-12 p-8 rounded-2xl shadow-2xl ${themeClasses.card}`}>
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-semibold mb-2 ${themeClasses.text}`}>
              Download Videos HD and Without Watermark
            </h2>
            <p className={themeClasses.textSecondary}>
              Paste your TikTok link below and click download
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <input
                type="text"
                id="url"
                placeholder="Paste TikTok URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${themeClasses.input} focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>

            <button
              onClick={startDownload}
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
              } text-white shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Download
                </>
              )}
            </button>

            {/* Result */}
            {result && (
              <div 
                className={`p-4 rounded-xl ${getResultBg()} text-center`}
                dangerouslySetInnerHTML={{ __html: result }}
              />
            )}
          </div>
        </div>

        {/* User Counter */}
        <div className={`max-w-md mx-auto mb-12 p-6 rounded-2xl shadow-lg ${themeClasses.card}`}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className={themeClasses.accent} size={24} />
              <h3 className={`text-xl font-semibold ${themeClasses.text}`}>
                Total Users
              </h3>
            </div>
            <p className={`text-3xl font-bold ${themeClasses.accent}`}>
              {userCount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className={`text-3xl font-bold text-center mb-8 ${themeClasses.text}`}>
            Why Choose Our Downloader?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Check, title: 'HD Video', desc: 'High quality downloads' },
              { icon: Zap, title: 'No Ads', desc: 'Clean experience' },
              { icon: Gift, title: 'Totally Free', desc: 'No hidden charges' },
              { icon: Shield, title: 'Without Watermark', desc: 'Clean videos' }
            ].map((feature, index) => (
              <div key={index} className={`p-6 rounded-2xl text-center transition-all duration-300 hover:transform hover:scale-105 ${themeClasses.card} shadow-lg hover:shadow-xl`}>
                <feature.icon className={`mx-auto mb-4 ${themeClasses.accent}`} size={32} />
                <h4 className={`text-xl font-semibold mb-2 ${themeClasses.text}`}>
                  {feature.title}
                </h4>
                <p className={themeClasses.textSecondary}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Channel Button */}
        <div className="text-center mb-8">
          <a
            href="https://whatsapp.com/channel/0029VaHI7LsFnSz1irwgsL1z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MessageCircle size={24} />
            Follow Developer WhatsApp Channel
          </a>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className={`text-lg ${themeClasses.textSecondary}`}>
            Developed by{' '}
            <a
              href="https://xhasi.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold transition-colors duration-300 ${themeClasses.accent} hover:${themeClasses.accentHover}`}
            >
              Haseeb Rashid
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;