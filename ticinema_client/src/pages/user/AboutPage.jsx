export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold flex items-center gap-2">
          <span className="text-orange-500">🎬</span> Movie Theme
        </a>
        <ul className="flex gap-6 text-sm font-medium">
          <li><a href="/" className="hover:text-orange-500">Home</a></li>
          <li><a href="/about" className="hover:text-orange-500">About</a></li>
          <li><a href="/movies" className="hover:text-orange-500">Movies</a></li>
          <li><a href="/blog" className="hover:text-orange-500">Blog</a></li>
          <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
          <li><a href="/login" className="hover:text-orange-500">Login</a></li>
          
        </ul>
      </nav>

      {/* About Section */}
      <section className="flex-1 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center px-6">
          <div>
            <h2 className="text-3xl font-bold mb-4">About Our Movie Booking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
              sapien nec nulla luctus gravida. Integer tincidunt, lectus sed
              facilisis pulvinar, libero nulla egestas sapien.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Fusce ac aliquet mi, id luctus erat. Suspendisse potenti. Duis
              finibus venenatis tortor, nec porta magna feugiat eget.
            </p>
          </div>
          <div>
            <img
              src="/images/about.jpg"
              alt="About"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-4 text-center text-sm">
        © 2025 Movie Booking. All rights reserved.
      </footer>
    </div>
  );
}