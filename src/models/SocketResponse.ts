interface ISocketResponse {
  data: Object | null;
  success: boolean;
  code: number;
  message: string;
}

export default class implements ISocketResponse {
  data: Object | null;
  success: boolean;
  code: number;
  message: string;

  constructor(success: boolean, 
    code: number, data: Object | null, message: string = "",) {
      this.data = data;
      this.success = success;
      this.code = code;
      this.message = message;
    }
}