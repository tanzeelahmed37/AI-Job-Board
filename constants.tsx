
import type { Job, User, Application } from './types';

export const ICONS = {
    briefcase: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-1 5a1 1 0 10-2 0v1h2V7zM9 4a1 1 0 011-1h.01a1 1 0 010 2H10a1 1 0 01-1-1z" clipRule="evenodd" /></svg>,
    location: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>,
    sparkles: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v1.5a.5.5 0 001 0V4a1 1 0 112 0v1.5a.5.5 0 001 0V4a1 1 0 112 0v1.5a.5.5 0 001 0V4a1 1 0 112 0v1.586l-1.707-1.707a1 1 0 011.414-1.414l2.5 2.5a1 1 0 010 1.414l-2.5 2.5a1 1 0 01-1.414-1.414L16 8.414V7a.5.5 0 00-1 0v1.414l-1.707-1.707a1 1 0 011.414-1.414l2.5 2.5a1 1 0 010 1.414l-2.5 2.5a1 1 0 01-1.414-1.414L14 11.586V10a.5.5 0 00-1 0v1.586l-1.707-1.707a1 1 0 011.414-1.414l2.5 2.5a1 1 0 010 1.414l-2.5 2.5a1 1 0 01-1.414-1.414L12 14.414V13a.5.5 0 00-1 0v1.414l-1.707-1.707a1 1 0 011.414-1.414l2.5 2.5a1 1 0 010 1.414l-2.5 2.5a1 1 0 01-1.414-1.414L10 17.586V16a1 1 0 11-2 0v1.586l1.707 1.707a1 1 0 01-1.414 1.414l-2.5-2.5a1 1 0 010-1.414l2.5-2.5a1 1 0 011.414 1.414L8 14.414V16a.5.5 0 001 0v-1.414l1.707 1.707a1 1 0 01-1.414 1.414l-2.5-2.5a1 1 0 010-1.414l2.5-2.5a1 1 0 011.414 1.414L6 11.586V13a.5.5 0 001 0v-1.586l1.707 1.707a1 1 0 01-1.414 1.414l-2.5-2.5a1 1 0 010-1.414l2.5-2.5a1 1 0 011.414 1.414L4 8.414V7a.5.5 0 00-1 0v1.414l-1.707-1.707a1 1 0 011.414-1.414l2.5 2.5a1 1 0 010 1.414l-2.5 2.5a1 1 0 01-1.414-1.414L2 5.586V4a1 1 0 112 0v1.586l1.707-1.707a1 1 0 01-1.414-1.414l-2.5 2.5a1 1 0 010 1.414l2.5 2.5a1 1 0 011.414-1.414L8 3.586V2a1 1 0 011-1h2z" clipRule="evenodd" /></svg>,
};

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Frontend Engineer',
    companyId: 'c1',
    companyName: 'Stripe',
    companyLogo: 'https://picsum.photos/seed/stripe/100/100',
    location: 'Remote',
    type: 'Full-time',
    category: 'Engineering',
    description: 'We are looking for a skilled Frontend Engineer to join our team. You will be responsible for building the client-side of our web applications. You should be able to translate our company and customer needs into functional and appealing interactive applications.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    postedDate: '2024-07-20',
  },
  {
    id: '2',
    title: 'Product Designer',
    companyId: 'c2',
    companyName: 'Figma',
    companyLogo: 'https://picsum.photos/seed/figma/100/100',
    location: 'San Francisco, CA',
    type: 'Full-time',
    category: 'Design',
    description: 'Figma is looking for a Product Designer to help us build the future of collaborative design tools. You will work on all aspects of the design process, from research and ideation to final high-fidelity mockups.',
    skills: ['UI/UX', 'Figma', 'Prototyping', 'User Research'],
    postedDate: '2024-07-18',
  },
  {
    id: '3',
    title: 'Marketing Intern',
    companyId: 'c3',
    companyName: 'Vercel',
    companyLogo: 'https://picsum.photos/seed/vercel/100/100',
    location: 'Remote',
    type: 'Internship',
    category: 'Marketing',
    description: 'Join our marketing team as an intern and help us grow our brand. You will be involved in content creation, social media management, and campaign analysis.',
    skills: ['Content Marketing', 'SEO', 'Social Media', 'Analytics'],
    postedDate: '2024-07-15',
  },
    {
    id: '4',
    title: 'Backend Developer (Python)',
    companyId: 'c1',
    companyName: 'Stripe',
    companyLogo: 'https://picsum.photos/seed/stripe/100/100',
    location: 'New York, NY',
    type: 'Full-time',
    category: 'Engineering',
    description: 'Design and implement services that handle millions of requests per day. You will work with a team of talented engineers to build a world-class payment infrastructure.',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    postedDate: '2024-07-21',
  },
  {
    id: '5',
    title: 'Data Scientist',
    companyId: 'c4',
    companyName: 'OpenAI',
    companyLogo: 'https://picsum.photos/seed/openai/100/100',
    location: 'San Francisco, CA',
    type: 'Full-time',
    category: 'Engineering',
    description: 'We are seeking a data scientist to analyze large datasets, develop predictive models, and help us make data-driven decisions that shape the future of artificial intelligence.',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'SQL'],
    postedDate: '2024-07-19',
  },
];

export const MOCK_STUDENT_USER: User = {
    id: 's1',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    role: 'student',
    profileImageUrl: 'https://picsum.photos/seed/alex/200/200',
};

export const MOCK_COMPANY_USER: User = {
    id: 'c1',
    name: 'Stripe Inc.',
    email: 'hr@stripe.com',
    role: 'company',
    profileImageUrl: 'https://picsum.photos/seed/stripe_hr/200/200',
};

export const MOCK_APPLICATIONS: Application[] = [
    {
        id: 'app1',
        jobId: '2',
        studentId: 's1',
        studentName: 'Alex Doe',
        resumeFileName: 'AlexDoe_Resume_Design.pdf',
        status: 'In Review',
        appliedDate: '2024-07-19',
    }
];

export const JOB_CATEGORIES = ['Engineering', 'Design', 'Marketing', 'Sales', 'Product'];
export const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract'];
