
export type MarketStatus = 'hot' | 'cold' | 'standard';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface VendorNode {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
  category: string;
  metrics: {
    profit: string;
    demand: MarketStatus;
    risk: RiskLevel;
  };
  link: string;
  tags: string[];
}

export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  category: 'Sneakers' | 'Electronics' | 'Methods' | 'Basics';
  instructor: string;
  dateAdded: string;
}

export interface DocumentResource {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  category: string;
  fileSize: string;
}

export type AppSection = 'dashboard' | 'lessons' | 'suppliers' | 'documents';
