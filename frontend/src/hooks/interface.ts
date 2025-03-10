export interface userData {
  isLogin: boolean;
  uuid: string | null;
  userName: string | null;
}
export interface SuccessResponse {
  status: true;
  message: string;
  data: {
    userId: string;
    email: string;
  };
}

export interface FailedResponse {
  message: string;
  statusCode: number;
}
