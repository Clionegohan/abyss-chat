// types/express-session.d.ts などに作成
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}
