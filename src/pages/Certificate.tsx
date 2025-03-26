import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Mock handwriting fonts
const handwritingFonts = [
  "'Caveat', cursive",
  "'Dancing Script', cursive",
  "'Kalam', cursive",
  "'Indie Flower', cursive",
  "'Shadows Into Light', cursive",
];

// Generate random Indian phone number
const generateRandomPhoneNumber = () => {
  const prefixes = ['91', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const remainingDigits = Math.floor(10000000 + Math.random() * 90000000);
  return `+91 ${prefix}${remainingDigits}`;
};

// Generate random address
const generateRandomAddress = (city: string, state: string) => {
  const streetNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 18, 20, 22, 25, 27, 30, 32, 35, 40, 42, 45, 50];
  const streetNames = ['Main Street', 'Park Avenue', 'Gandhi Road', 'Nehru Marg', 'Patel Street', 'Lake View Road', 'Hospital Road', 'College Road', 'Station Road', 'Market Street', 'Temple Road', 'Wellness Road', 'Green Avenue', 'New Colony'];
  const areas = ['Sector', 'Phase', 'Block', 'Colony', 'Extension', 'Nagar', 'Vihar', 'Enclave'];
  const areaNumbers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '15', '18', '20'];
  
  const streetNumber = streetNumbers[Math.floor(Math.random() * streetNumbers.length)];
  const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
  const area = areas[Math.floor(Math.random() * areas.length)];
  const areaNumber = areaNumbers[Math.floor(Math.random() * areaNumbers.length)];
  
  return `${streetNumber}, ${streetName}, ${area} ${areaNumber}, ${city}, ${state}`;
};

// Generate random certificate ID
const generateCertificateId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetters = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  const year = new Date().getFullYear();
  return `${randomLetters}-${year}-${randomDigits}`;
};

// Type for certificate data
interface CertificateData {
  patientName: string;
  patientAge: string;
  patientGender: string;
  parentName: string;
  institutionName: string;
  reasonForAbsence: string;
  startDate: string;
  endDate: string;
  cityName: string;
  stateName: string;
  doctorName?: string;
  additionalNotes?: string;
}

// Format date from YYYY-MM-DD to Month DD, YYYY
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Get date range string
const getDateRange = (startDate: string, endDate: string) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  
  // Calculate number of days
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return `${start} to ${end} (${diffDays} days)`;
};

// Random letter variations for handwriting effect
const getRandomVariation = (text: string) => {
  return text.split('').map(char => {
    if (char === ' ') return ' ';
    const randomRotation = Math.random() * 6 - 3; // -3 to 3 degrees (subtler rotation)
    return `<span style="display: inline-block; transform: rotate(${randomRotation}deg);">${char}</span>`;
  }).join('');
};

const Certificate = () => {
  const navigate = useNavigate();
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [randomFont, setRandomFont] = useState(handwritingFonts[0]);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));
  const [randomPhoneNumber] = useState(generateRandomPhoneNumber());
  const [certificateId] = useState(generateCertificateId());
  const [randomClinicName] = useState('HealthCare Plus Clinic');
  const [randomAddress, setRandomAddress] = useState('');
  
  const certificateRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Load certificate data from sessionStorage
    const storedData = sessionStorage.getItem('certificateData');
    
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCertificateData(parsedData);
      setRandomAddress(generateRandomAddress(parsedData.cityName, parsedData.stateName));
      
      // Load Google Fonts for handwriting
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Caveat&family=Dancing+Script&family=Indie+Flower&family=Kalam&family=Shadows+Into+Light&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      // Choose a random handwriting font
      setRandomFont(handwritingFonts[Math.floor(Math.random() * handwritingFonts.length)]);
      
      // Simulate loading delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } else {
      // Redirect to form if no data
      navigate('/form');
    }
  }, [navigate]);
  
  const handleDownloadPDF = () => {
    if (certificateRef.current) {
      setIsLoading(true);
      
      html2canvas(certificateRef.current, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 20;
        
        pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`medical_certificate_${certificateData?.patientName.replace(/\s+/g, '_').toLowerCase()}.pdf`);
        
        setIsLoading(false);
      });
    }
  };
  
  const handleEditForm = () => {
    navigate('/form');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your certificate...</p>
        </div>
      </div>
    );
  }
  
  if (!certificateData) return null;
  
  const genderPronoun = 
    certificateData.patientGender === 'male' ? 'his' : 
    certificateData.patientGender === 'female' ? 'her' : 
    'their';
  
  // Highlighted information style
  const highlightedTextStyle = {
    fontFamily: randomFont,
    color: '#4682B4', // Steel blue color for pen
    fontSize: '1.1rem',
    position: 'relative' as const,
    zIndex: 10,
    padding: '0 2px'
  };

  // Dash style for underline
  const dashStyle = {
    position: 'relative' as const,
    display: 'inline-block',
  };

  const dashLineStyle = {
    position: 'absolute' as const,
    bottom: '-2px',
    left: 0,
    width: '100%',
    borderBottom: '1px dashed #a0a0a0',
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Certificate wrapper with scroll for small screens */}
      <div className="bg-white rounded-lg shadow-xl p-4 mb-6 overflow-auto">
        {/* Fixed-width container to prevent responsive layout issues */}
        <div className="certificate-wrapper min-w-[700px] max-w-[800px] mx-auto">
          <div ref={certificateRef} className="certificate-container relative bg-white p-8 border-8 border-double border-gray-300 min-h-[700px]">
            {/* Certificate Header with Logo */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#2a6fd6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-800">{randomClinicName}</h2>
                  <p className="text-sm text-gray-600">{randomAddress}</p>
                  <p className="text-sm text-gray-600">Phone: {randomPhoneNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Certificate ID: {certificateId}</p>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold uppercase tracking-wider text-blue-900 mb-1">MEDICAL CERTIFICATE</h1>
              <div className="h-1 w-32 bg-blue-900 mx-auto"></div>
            </div>
            
            {/* Certificate Date and Location */}
            <div className="flex justify-end mb-6">
              <p style={{ fontFamily: randomFont }} className="text-gray-700">
                {certificateData.cityName}, {currentDate}
              </p>
            </div>
            
            {/* Certificate Content - Letterhead */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">To Whom It May Concern:</h2>
              <p className="mb-2">
                <span className="font-semibold">Institution:</span>{' '}
                <span style={dashStyle}>
                  <span style={highlightedTextStyle}>{certificateData.institutionName}</span>
                  <span style={dashLineStyle}></span>
                </span>
              </p>
            </div>
            
            {/* Certificate Content - Main Body */}
            <div className="mb-8 leading-relaxed text-lg">
              <p className="mb-4">
                This is to certify that{' '}
                <span style={dashStyle}>
                  <span style={highlightedTextStyle} dangerouslySetInnerHTML={{ 
                    __html: getRandomVariation(certificateData.patientName)
                  }}></span>
                  <span style={dashLineStyle}></span>
                </span>
                , aged{' '}
                <span style={dashStyle}>
                  <span style={highlightedTextStyle} dangerouslySetInnerHTML={{ 
                    __html: getRandomVariation(certificateData.patientAge)
                  }}></span>
                  <span style={dashLineStyle}></span>
                </span>
                {' '}years, was unable to attend{' '}
                <span style={dashStyle}>
                  <span style={highlightedTextStyle} dangerouslySetInnerHTML={{ 
                    __html: getRandomVariation(certificateData.institutionName)
                  }}></span>
                  <span style={dashLineStyle}></span>
                </span>
                {' '}due to{' '}
                <span style={dashStyle}>
                  <span style={highlightedTextStyle} dangerouslySetInnerHTML={{ 
                    __html: getRandomVariation(certificateData.reasonForAbsence)
                  }}></span>
                  <span style={dashLineStyle}></span>
                </span>
                .
              </p>
              
              <p className="mb-4">
                {certificateData.patientGender === 'male' ? 'He' : certificateData.patientGender === 'female' ? 'She' : 'They'} was advised complete rest and proper medication for the period of{' '}
                <span style={dashStyle}>
                  <span style={highlightedTextStyle} dangerouslySetInnerHTML={{ 
                    __html: getRandomVariation(getDateRange(certificateData.startDate, certificateData.endDate))
                  }}></span>
                  <span style={dashLineStyle}></span>
                </span>
                .
              </p>
              
              <p className="mb-4">
                During this period, {certificateData.patientGender === 'male' ? 'he' : certificateData.patientGender === 'female' ? 'she' : 'they'} was unable to perform any academic activities due to {genderPronoun} medical condition.
              </p>
              
              {certificateData.additionalNotes && (
                <p className="mb-4">
                  <span style={highlightedTextStyle} dangerouslySetInnerHTML={{ 
                    __html: getRandomVariation(certificateData.additionalNotes)
                  }}></span>
                </p>
              )}
              
              <p className="mb-4">
                I request you to consider {genderPronoun} medical leave and grant necessary attendance/exemption as per your institution rules.
              </p>
            </div>
            
            {/* Certificate Signature Area */}
            <div className="flex justify-between items-end mt-12">
              <div className="max-w-[45%]">
                <p style={highlightedTextStyle} className="mb-2" dangerouslySetInnerHTML={{ 
                  __html: getRandomVariation(certificateData.parentName)
                }}></p>
                <p className="text-gray-600">Parent/Guardian</p>
              </div>
              
              <div className="max-w-[45%] text-right">
                <p style={highlightedTextStyle} className="mb-2" dangerouslySetInnerHTML={{ 
                  __html: getRandomVariation(certificateData.doctorName || "Dr. Medical Practitioner")
                }}></p>
                <p className="md:font-bold text-gray-600" dangerouslySetInnerHTML={{ 
                  __html: getRandomVariation(certificateData.doctorName || "Dr. Medical Practitioner")
                }}></p>
                <p className="text-gray-600">MBBS, MPH, REG. NO: 110212</p>
                <p className="text-gray-600">Sr. Medical Supridentent</p>
              </div>
            </div>
            
            {/* Certificate Stamp/Seal */}
            <div className="absolute bottom-16 right-16 opacity-40 rotate-[-15deg]">
              <div className="border-2 border-gray-500 rounded-full h-24 w-24 flex items-center justify-center p-1">
                <div className="border-2 border-gray-500 rounded-full h-full w-full flex items-center justify-center text-gray-600 text-xs text-center p-1">
                  MEDICAL<br/>CERTIFICATE<br/>SEAL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <button 
          onClick={handleEditForm}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Edit Information
        </button>
        
        <button 
          onClick={handleDownloadPDF}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
      
      {/* Optional: Add instructions for mobile users */}
      <div className="text-center text-gray-500 text-sm md:hidden mb-4">
        <p>For best viewing experience, scroll horizontally to see the full certificate.</p>
      </div>
      
      <div className="text-center text-gray-500 text-sm">
        <p>This certificate is for demonstration purposes only.</p>
        <p>Generated on {currentDate}</p>
      </div>
    </div>
  );
};

export default Certificate; 