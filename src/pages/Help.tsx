
export default function Help() {
  return (
    <nav className="py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
          <span className="text-black text-xl font-semibold">Fly.io</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 bg-gradient-to-r from-gray-900 to-gray-800 text-black px-5 py-2 rounded-lg">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Articles</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Security</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Infra Log</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Docs</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Community</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Status</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-800 hover:text-black transition-colors">
            Sign In
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-black px-4 py-2 rounded-md transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
