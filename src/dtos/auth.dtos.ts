export interface RegisterDto {
  name: string
  username: string
  email: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface RefreshTokenDto {
  refreshToken: string
}

export interface LoginResponseDto {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    name: string
    username: string
    email: string
    role: {
      id: string
      name: string
    }
  }
}

export interface RegisterResponseDto {
  id: string
  name: string
  username: string
  email: string
  role: {
    id: string
    name: string
  }
}

export interface ForgotPasswordDto {
  email: string
}

export interface ResetPasswordDto {
  email: string
  otp: string
  password: string
}

export interface OAuthDto {
  name: string
  username: string
  email: string
  // password: string
  roleId: string
}
