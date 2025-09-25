
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'company';
  profileImageUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  category: 'Engineering' | 'Design' | 'Marketing' | 'Sales' | 'Product';
  description: string;
  skills: string[];
  postedDate: string;
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  studentName: string;
  resumeFileName: string;
  status: 'Submitted' | 'In Review' | 'Interviewing' | 'Offered' | 'Rejected';
  appliedDate: string;
}
