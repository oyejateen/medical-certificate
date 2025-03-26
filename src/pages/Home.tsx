import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Medical Certificate Generator</h1>
        <p className="text-lg text-gray-600 mb-8">
          Create medical certificates easily for absences due to health issues
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Use Our Service?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Quickly generate professional medical certificates</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Customize with your personal information</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Download as PDF for easy sharing</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Handwritten-style text for authenticity</span>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <img 
              src="https://img.freepik.com/free-vector/medical-prescription-concept-illustration_114360-6916.jpg" 
              alt="Medical Certificate Illustration" 
              className="max-h-64 rounded-lg shadow"
            />
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/form" 
            className="btn btn-primary text-lg px-8 py-3"
          >
            <span className="hidden sm:inline">Create Your Certificate Now</span>
            <span className="sm:hidden">Get Started</span>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="card">
          <div className="flex justify-center mb-4">
            <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">Simple Form</h3>
          <p className="text-gray-600 text-center">Fill out a simple form with your details</p>
        </div>
        
        <div className="card">
          <div className="flex justify-center mb-4">
            <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">AI Generation</h3>
          <p className="text-gray-600 text-center">Our AI creates a personalized certificate</p>
        </div>
        
        <div className="card">
          <div className="flex justify-center mb-4">
            <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">Download PDF</h3>
          <p className="text-gray-600 text-center">Download your certificate as a PDF</p>
        </div>
      </div>

      <footer className="text-center text-gray-500 text-sm mt-16">
        <p>&copy; {new Date().getFullYear()} Medical Certificate Generator. All rights reserved.</p>
        <p className="mt-1">This is for demonstration purposes only.</p>
      </footer>
    </div>
  );
};

export default Home; 