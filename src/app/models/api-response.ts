export class ApiResponse<T>{
    success: boolean;
    data: T;
    errorMessage: string;
}