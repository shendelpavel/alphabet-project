export interface User {
  role: string;
  isLoggedIn: boolean;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  addedParents: string[];
  addedNewStudents: object[];
  addedExistingStudents: string[];
}
