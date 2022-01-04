export interface User {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  addedParents: string[];
  addedNewStudents: object[];
  addedExistingStudents: string[];
}
