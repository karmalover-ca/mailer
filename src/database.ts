import * as fs from 'fs';

const EMAILS_FILE_PATH = 'emails.json';

interface EmailManager {
  getEmails(): string[];
  addEmail(email: string): void;
  removeEmail(email: string): void;
}

class EmailManagerImpl implements EmailManager {
  private emails: string[];

  constructor() {
    this.emails = this.loadEmails();
  }

  private loadEmails(): string[] {
    try {
      const data = fs.readFileSync(EMAILS_FILE_PATH, 'utf-8');
      return JSON.parse(data) as string[];
    } catch (error) {
      // If the file doesn't exist or there's an error reading it, return an empty array
      return [];
    }
  }

  private saveEmails(): void {
    fs.writeFileSync(EMAILS_FILE_PATH, JSON.stringify(this.emails, null, 2), 'utf-8');
  }

  getEmails(): string[] {
    return this.emails;
  }

  addEmail(email: string): void {
    this.emails.push(email);
    this.saveEmails();
  }

  removeEmail(email: string): boolean {
    const index = this.emails.indexOf(email);
    if (index !== -1) {
      this.emails.splice(index, 1);
      this.saveEmails();
      return true
    } else {
      return false
    }
  }
}

export { EmailManagerImpl };