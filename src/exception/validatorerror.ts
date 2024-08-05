export class ValidationError {
    messages:any[]
    constructor(readonly message: any[]) {
        this.messages=message;
    }
  
   
  }