import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">Medical Certificate Generator</h1>
          <p className="text-xl text-gray-600 mb-8">
            Create professional medical certificates in seconds
          </p>
          <div className="w-40 h-0.5 bg-blue-500 mx-auto rounded-full"></div>
        </header>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-10 border border-blue-100 hover:translate-y-[-5px] transition-transform duration-300">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Use Our Service?</h2>
              <ul className="space-y-4 text-gray-700">
                {[
                  "Quickly generate professional medical certificates",
                  "Customize with your personal information",
                  "Download as PDF for easy sharing",
                  "Handwritten-style text for authenticity"
                ].map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="pt-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center hover:rotate-1 transition-transform duration-300">
              <img 
                src="https://img.freepik.com/free-vector/medical-prescription-concept-illustration_114360-6916.jpg" 
                alt="Medical Certificate Illustration" 
                className="max-h-72 rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <div className="hover:scale-105 active:scale-95 transition-transform duration-300 inline-block">
              <Link 
                to="/form" 
                className="inline-flex items-center justify-center bg-blue-600 text-white text-lg font-medium rounded-full px-10 py-4 shadow-lg hover:bg-blue-700 transition-colors"
              >
                <span>Create Your Certificate</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            {
              icon: (
                <svg className="h-14 w-14 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              title: "Simple Form",
              description: "Fill out a simple form with your details"
            },
            {
              icon: (
                <svg className="h-14 w-14 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
              title: "AI Generation",
              description: "Our AI creates a personalized certificate"
            },
            {
              icon: (
                <svg className="h-14 w-14 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              ),
              title: "Download PDF",
              description: "Download your certificate as a PDF"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-blue-200 hover:translate-y-[-10px] hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{item.title}</h3>
              <p className="text-gray-600 text-center">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <a 
            href="https://buymeacoffee.com/heyjateen" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-yellow-500 text-white font-medium rounded-full px-6 py-3 shadow-md hover:bg-yellow-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z"/>
            </svg>
            <span>Buy me a coffee</span>
          </a>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-12">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">About This Project</h2>
          <p className="text-gray-700 leading-relaxed text-center">
            Our Medical Certificate Generator provides a simple way to create professional-looking medical certificates.
            Whether you need a certificate for work, school, or any other purpose, our tool makes it quick and easy.
          </p>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-16">
          <p>&copy; {new Date().getFullYear()} Medical Certificate Generator. All rights reserved.</p>
          <p className="mt-1">This is for demonstration purposes only.</p>
          <div className="mt-4">
            <a 
              href="https://buymeacoffee.com/heyjateen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              Created by Jateen
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home; 