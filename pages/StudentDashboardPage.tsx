
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { analyzeResume, generateProfileImage } from '../services/geminiService';
import { MOCK_APPLICATIONS, MOCK_JOBS } from '../constants';
import Spinner from '../components/Spinner';

const StudentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(user?.profileImageUrl || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeText(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleResumeAnalysis = async () => {
    if (!resumeText) {
      setError('Please upload a resume first.');
      return;
    }
    setError('');
    setIsAnalyzing(true);
    setAnalysis('');
    try {
      const result = await analyzeResume(resumeText);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to analyze resume.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageGeneration = async () => {
    if (!imagePrompt) {
        setError('Please enter a prompt for your image.');
        return;
    }
    setError('');
    setIsGenerating(true);
    setGeneratedImage(null);
    try {
        const base64Image = await generateProfileImage(imagePrompt);
        setGeneratedImage(`data:image/jpeg;base64,${base64Image}`);
    } catch (err: any) {
        setError(err.message || 'Failed to generate image.');
    } finally {
        setIsGenerating(false);
    }
  };


  if (!user || user.role !== 'student') {
    return <div className="text-center text-xl">Access Denied. Please log in as a student.</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Welcome, {user.name}!</h1>

      {/* Profile & AI Image Generation */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center space-y-4">
                {isGenerating ? <Spinner /> : 
                  <img src={generatedImage || 'https://picsum.photos/seed/placeholder/200/200'} alt="Profile" className="w-48 h-48 rounded-full object-cover border-4 border-indigo-200" />
                }
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="md:col-span-2 space-y-4">
                 <h3 className="text-xl font-semibold">Generate AI Profile Image</h3>
                 <p className="text-sm text-gray-600">Describe your ideal professional look. e.g., "a person with curly brown hair, wearing glasses and a blue shirt".</p>
                 <input
                    type="text"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Describe your image..."
                    className="w-full border-gray-300 rounded-md shadow-sm"
                />
                 <button onClick={handleImageGeneration} disabled={isGenerating} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
                     {isGenerating ? 'Generating...' : 'Generate Image'}
                 </button>
                 {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
      </div>

      {/* AI Resume Analyzer */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">AI Resume Analyzer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="resumeUpload" className="block text-sm font-medium text-gray-700">Upload Your Resume (.txt)</label>
            <input
              id="resumeUpload"
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {resumeFile && <p className="text-sm mt-2 text-gray-600">Selected: {resumeFile.name}</p>}
            <button onClick={handleResumeAnalysis} disabled={isAnalyzing || !resumeFile} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
              {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Analysis Feedback</h3>
            {isAnalyzing && <Spinner />}
            {analysis && (
              <div className="mt-2 p-4 bg-gray-50 rounded-md border max-h-96 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap">{analysis}</p>
              </div>
            )}
            {!analysis && !isAnalyzing && <p className="text-sm text-gray-500 mt-2">Upload your resume and click analyze to get feedback.</p>}
          </div>
        </div>
      </div>

      {/* My Applications */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_APPLICATIONS.map(app => {
                const job = MOCK_JOBS.find(j => j.id === app.jobId);
                return (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job?.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job?.companyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(app.appliedDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{app.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
