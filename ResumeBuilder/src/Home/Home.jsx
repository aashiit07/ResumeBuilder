
import React from 'react';
import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Sparkles, FileText, Palette, Wand2  } from 'lucide-react';

function Home() {
  const { isSignedIn } = useUser();

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="py-24 px-6 md:px-20 text-center bg-gradient-to-br from-indigo-100 via-pink-100 to-blue-100">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Build Your AI-Enhanced Resume
          </span>
        </h1>
        <p className="text-lg text-gray-600 mt-6 mb-10 max-w-2xl mx-auto">
          Create stunning, professional resumes with AI-powered suggestions, live previews, and beautiful themes — all in one place.
        </p>

        <Link to={isSignedIn ? "/dashboard" : "/auth/sign-in"}>
          <Button className="px-6 py-3 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            {isSignedIn ? "Go to Dashboard" : "Get Started for Free"}
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-14 text-gray-800">Why You’ll Love It</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 shadow-lg rounded-2xl border hover:shadow-xl transition">
            <Wand2 className="mx-auto mb-4 h-10 w-10 text-purple-500" />
            <h3 className="font-bold mb-2 text-lg">AI-Powered Content</h3>
            <p className="text-gray-500 text-sm">Get smart summaries, job descriptions, and skills tailored to your role with one click.</p>
          </div>
          <div className="p-8 shadow-lg rounded-2xl border hover:shadow-xl transition">
            <FileText className="mx-auto mb-4 h-10 w-10 text-blue-500" />
            <h3 className="font-bold mb-2 text-lg">Live Resume Preview</h3>
            <p className="text-gray-500 text-sm">See your resume come to life instantly as you fill out your details.</p>
          </div>
          <div className="p-8 shadow-lg rounded-2xl border hover:shadow-xl transition">
            <Palette className="mx-auto mb-4 h-10 w-10 text-pink-500" />
            <h3 className="font-bold mb-2 text-lg">Custom Theme Colors</h3>
            <p className="text-gray-500 text-sm">Pick a color that fits your style and make your resume stand out.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Craft Your Dream Resume?</h2>
        <Link to={isSignedIn ? "/dashboard" : "/auth/sign-in"}>
          <Button className="px-8 py-3 text-lg rounded-full shadow-md bg-purple-600 hover:bg-purple-700 transition text-white">
            {isSignedIn ? "Open My Dashboard" : "Get Started Now"}
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 text-sm border-t">
      © 2025 Resume Builder powered by AI — Built for future achievers -- CareerCrafts
      </footer>
    </div>
  );
}

export default Home;
