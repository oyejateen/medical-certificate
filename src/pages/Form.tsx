import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema validation
const formSchema = z.object({
  patientName: z.string().min(2, { message: "Patient name is required" }),
  patientAge: z.string().min(1, { message: "Age is required" }),
  patientGender: z.enum(["male", "female", "other"], { 
    errorMap: () => ({ message: "Please select a gender" }) 
  }),
  parentName: z.string().min(2, { message: "Parent/Guardian name is required" }),
  institutionName: z.string().min(2, { message: "Institution name is required" }),
  reasonForAbsence: z.string().min(5, { message: "Reason for absence is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  cityName: z.string().min(2, { message: "City name is required" }),
  stateName: z.string().min(2, { message: "State name is required" }),
  doctorName: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Form = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  
  const watchedValues = watch();
  
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsSubmitting(true);
    
    // Store the form data in sessionStorage to pass to the certificate page
    sessionStorage.setItem('certificateData', JSON.stringify(data));
    
    // Simulate API call with a delay
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/certificate');
    }, 1500);
  };
  
  // Check if required fields are filled for each step
  const canProceedStep1 = watchedValues.patientName?.length >= 2 && 
                           watchedValues.patientAge?.length >= 1 && 
                           watchedValues.patientGender;
                           
  const canProceedStep2 = watchedValues.parentName?.length >= 2 && 
                           watchedValues.institutionName?.length >= 2;
                           
  const canProceedStep3 = watchedValues.reasonForAbsence?.length >= 5 && 
                           watchedValues.startDate && 
                           watchedValues.endDate;

  const canProceedStep4 = watchedValues.cityName?.length >= 2 &&
                            watchedValues.stateName?.length >= 2;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-center text-blue-800 mb-4">Medical Certificate Form</h1>
        <p className="text-gray-600 text-center">
          Fill in the details below to generate your medical certificate
        </p>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${(step / 4) * 100}%` }}>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step >= 1 ? "text-blue-600 font-medium" : "text-gray-400"}>Personal Details</span>
          <span className={step >= 2 ? "text-blue-600 font-medium" : "text-gray-400"}>Institution</span>
          <span className={step >= 3 ? "text-blue-600 font-medium" : "text-gray-400"}>Absence Details</span>
          <span className={step >= 4 ? "text-blue-600 font-medium" : "text-gray-400"}>Additional Info</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Personal Information</h2>
              
              <div className="form-group">
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="patientName"
                  {...register("patientName")}
                  className={`w-full p-3 border rounded-md ${errors.patientName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="John Doe"
                />
                {errors.patientName && (
                  <p className="text-red-500 text-sm mt-1">{errors.patientName.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="patientAge" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    id="patientAge"
                    {...register("patientAge")}
                    className={`w-full p-3 border rounded-md ${errors.patientAge ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="21"
                  />
                  {errors.patientAge && (
                    <p className="text-red-500 text-sm mt-1">{errors.patientAge.message}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="patientGender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    id="patientGender"
                    {...register("patientGender")}
                    className={`w-full p-3 border rounded-md ${errors.patientGender ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.patientGender && (
                    <p className="text-red-500 text-sm mt-1">{errors.patientGender.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Parent and Institution Details */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Institution Details</h2>
              
              <div className="form-group">
                <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name</label>
                <input
                  type="text"
                  id="parentName"
                  {...register("parentName")}
                  className={`w-full p-3 border rounded-md ${errors.parentName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Parent/Guardian Name"
                />
                {errors.parentName && (
                  <p className="text-red-500 text-sm mt-1">{errors.parentName.message}</p>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 mb-1">Institution/College/School Name</label>
                <input
                  type="text"
                  id="institutionName"
                  {...register("institutionName")}
                  className={`w-full p-3 border rounded-md ${errors.institutionName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Institution Name"
                />
                {errors.institutionName && (
                  <p className="text-red-500 text-sm mt-1">{errors.institutionName.message}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Step 3: Absence Details */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Absence Details</h2>
              
              <div className="form-group">
                <label htmlFor="reasonForAbsence" className="block text-sm font-medium text-gray-700 mb-1">Reason for Absence</label>
                <textarea
                  id="reasonForAbsence"
                  {...register("reasonForAbsence")}
                  className={`w-full p-3 border rounded-md ${errors.reasonForAbsence ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Describe the health issue or reason"
                  rows={4}
                ></textarea>
                {errors.reasonForAbsence && (
                  <p className="text-red-500 text-sm mt-1">{errors.reasonForAbsence.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Absence Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    {...register("startDate")}
                    className={`w-full p-3 border rounded-md ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Absence End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    {...register("endDate")}
                    className={`w-full p-3 border rounded-md ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Additional Information */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Additional Information</h2>
              
              <div className="form-group">
                <label htmlFor="cityName" className="block text-sm font-medium text-gray-700 mb-1">City Name</label>
                <input
                  type="text"
                  id="cityName"
                  {...register("cityName")}
                  className={`w-full p-3 border rounded-md ${errors.cityName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="City Name"
                />
                {errors.cityName && (
                  <p className="text-red-500 text-sm mt-1">{errors.cityName.message}</p>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="stateName" className="block text-sm font-medium text-gray-700 mb-1">State Name</label>
                <input
                  type="text"
                  id="stateName"
                  {...register("stateName")}
                  className={`w-full p-3 border rounded-md ${errors.stateName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="State Name"
                />
                {errors.stateName && (
                  <p className="text-red-500 text-sm mt-1">{errors.stateName.message}</p>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 mb-1">Doctor's Name (Optional)</label>
                <input
                  type="text"
                  id="doctorName"
                  {...register("doctorName")}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Dr. Smith"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                <textarea
                  id="additionalNotes"
                  {...register("additionalNotes")}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Any additional information to include"
                  rows={3}
                ></textarea>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={
                  (step === 1 && !canProceedStep1) || 
                  (step === 2 && !canProceedStep2) || 
                  (step === 3 && !canProceedStep3)
                }
                className={`ml-auto px-6 py-2 rounded-md text-white transition-colors ${
                  ((step === 1 && canProceedStep1) || 
                   (step === 2 && canProceedStep2) || 
                   (step === 3 && canProceedStep3)) 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-300 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !canProceedStep4}
                className={`ml-auto px-6 py-2 rounded-md text-white transition-colors ${
                  !isSubmitting && isValid && canProceedStep4
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-green-300 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Generate Certificate'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form; 