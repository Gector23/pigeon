import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SignInBody {
  @IsString({ message: "Email required." })
  email!: string;

  @IsString({ message: "Password required." })
  password!: string;
}

export class SignUpBody {
  @IsEmail({}, { message: "Invalid email address." })
  email!: string;

  @IsStrongPassword({}, { message: "Password is not strong enough." })
  password!: string;
}
