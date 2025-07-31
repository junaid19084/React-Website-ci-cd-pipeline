// Sample flashcard data for different categories
export const sampleFlashcards = [
  // AWS Cards
  {
    id: 'aws-1',
    question: 'What is Amazon S3?',
    answer: 'Amazon Simple Storage Service (S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance.',
    category: 'AWS',
    difficulty: 'Easy',
    tags: ['storage', 's3', 'object-storage']
  },
  {
    id: 'aws-2',
    question: 'What is the difference between EC2 and Lambda?',
    answer: 'EC2 provides virtual servers that you manage, while Lambda is a serverless compute service that runs code without provisioning or managing servers.',
    category: 'AWS',
    difficulty: 'Medium',
    tags: ['compute', 'ec2', 'lambda', 'serverless']
  },
  {
    id: 'aws-3',
    question: 'What is Amazon VPC?',
    answer: 'Virtual Private Cloud (VPC) is a logically isolated section of the AWS cloud where you can launch AWS resources in a virtual network that you define.',
    category: 'AWS',
    difficulty: 'Medium',
    tags: ['networking', 'vpc', 'security']
  },
  
  // DevOps Cards
  {
    id: 'devops-1',
    question: 'What is CI/CD?',
    answer: 'Continuous Integration/Continuous Deployment - a set of practices that automate the integration of code changes and deployment to production.',
    category: 'DevOps',
    difficulty: 'Easy',
    tags: ['ci-cd', 'automation', 'deployment']
  },
  {
    id: 'devops-2',
    question: 'What is Docker?',
    answer: 'Docker is a platform that uses containerization to package applications and their dependencies into lightweight, portable containers.',
    category: 'DevOps',
    difficulty: 'Easy',
    tags: ['docker', 'containers', 'virtualization']
  },
  {
    id: 'devops-3',
    question: 'What is Kubernetes?',
    answer: 'Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.',
    category: 'DevOps',
    difficulty: 'Hard',
    tags: ['kubernetes', 'orchestration', 'containers']
  },
  
  // General Knowledge Cards
  {
    id: 'general-1',
    question: 'What is REST API?',
    answer: 'Representational State Transfer API - an architectural style for designing networked applications using HTTP methods and stateless communication.',
    category: 'General Knowledge',
    difficulty: 'Medium',
    tags: ['api', 'rest', 'http', 'architecture']
  },
  {
    id: 'general-2',
    question: 'What is Git?',
    answer: 'Git is a distributed version control system that tracks changes in source code during software development.',
    category: 'General Knowledge',
    difficulty: 'Easy',
    tags: ['git', 'version-control', 'development']
  }
];

export const categories = ['AWS', 'DevOps', 'General Knowledge'];
export const difficulties = ['Easy', 'Medium', 'Hard'];
