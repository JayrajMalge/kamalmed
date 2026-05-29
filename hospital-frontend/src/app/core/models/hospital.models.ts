export interface User {
  userid: number;
  username: string;
  email: string;
  role: 'Admin' | 'Visitor';
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
  email: string;
}

export interface Specialization {
  speacializationid: number;
  fieldname: string;
  description: string;
  imagepath?: string;
  subSpecializations?: SubSpecialization[];
}

export interface SubSpecialization {
  subspeacializationid: number;
  name: string;
  description: string;
  images?: ImageItem[];
}

export interface ImageItem {
  imagepath: string;
  imagename: string;
}

export interface Disease {
  diseaseid: number;
  name: string;
  description: string;
  images?: ImageItem[];
}

export interface Facility {
  facilitesid: number;
  facilityname: string;
  description: string;
  availability: 'yes' | 'no';
  facilitytype?: string;
  images?: ImageItem[];
}

export interface News {
  newsid: number;
  title: string;
  description: string;
  newsdate: string;
  newstype?: string;
  images?: ImageItem[];
}

export interface Treatment {
  treatmentid: number;
  title: string;
  description: string;
  cost?: number;
  tratmentdate?: string;
}

export interface Doctor {
  doctorid: number;
  name: string;
  email?: string;
  phone?: string;
  schedulefrom?: string;
  scheduleto?: string;
  profilephotopath?: string;
  about?: string;
  doctor?: string;
  educations?: Education[];
  experiences?: Experience[];
  specializations?: DoctorSpec[];
}

export interface Education {
  educationid?: number;
  degree: string;
  universityname: string;
  fromdate?: string;
  todate?: string;
}

export interface Experience {
  experienceid?: number;
  field: string;
  hospitalname: string;
  years?: number;
  fromdate?: string;
  todate?: string;
}

export interface DoctorSpec {
  doctorspeacializationid?: number;
  specialization?: Specialization;
}

export interface Appointment {
  appointmentid?: number;
  doctor?: Doctor;
  appointmentdate?: string;
  status?: 'Scheduled' | 'Completed' | 'Canceled';
  mobileno?: string;
}

export interface PageResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}
