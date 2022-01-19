export interface Parent {
  role: string;
  isLoggedIn: boolean;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  addedNewStudents: object[];
  addedExistingStudents: string[];
}

export interface Student {
  role: string;
  isLoggedIn: boolean;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  addedParents: string[];
}
