export class Employee {
    id: number;
    name: string;
    gender: string;
    email?: string;
    phoneNumber?: number;
    contactPreference: string;
    dateOfBirth: Date;
    //dateOfBirth: string;
    department: string;
    isActive: boolean;
    photoPath?: string;
    password:string;
    confirmPassword:string;
}