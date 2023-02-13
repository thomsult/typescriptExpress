
class Exception {
  constructor(readonly error: any, readonly status: number) {}
}

export class NotFoundException extends Exception {
  constructor(error?: any | undefined) {
    super(error?error:"Not Found", 404)
  }
}

//401

export class CreateException extends Exception{
  constructor(error: any,status: number) {
    super(error, status)
  }
}

export class BadRequestException extends Exception {
  constructor(error: any) {
    super(error, 400)
  }
}