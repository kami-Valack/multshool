export interface IEmailService {
  sendPasswordResetEmail(email: string, name: string, resetToken: string, resetUrl: string): Promise<void>;
  sendVerificationEmail(email: string, name: string, verificationToken: string, verificationUrl: string): Promise<void>;
}

