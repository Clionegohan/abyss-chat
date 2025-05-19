import request from 'supertest';
import app from '../../app'; // Expressインスタンス
import prisma from '../../config/db';
import bcrypt from 'bcrypt';

describe('🧪 Auth Integration Tests', () => {
  const testEmail = 'testuser@example.com';
  const testPassword = 'Test1234';
  let cookie: string[];

  beforeAll(async () => {
    const existing = await prisma.user.findUnique({ where: { email: testEmail } });
    console.log('既存ユーザー:', existing);
    if (!existing) {
      const created = await prisma.user.create({
        data: {
          name: 'Test User',
          email: testEmail,
          passwordHash: await bcrypt.hash(testPassword, 12),
          gender: 'その他',
          avatarUrl: 'sea-angel.png',
          message: 'よろしくお願いします',
        },
      });
      console.log('作成されたユーザー:', created);
      console.log('✅ Using DB:', process.env.DATABASE_URL);
    }
  });
  
  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$disconnect();
  });

  it('✅ 正しい情報でログインでき、Cookieが返る', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: testEmail, password: testPassword });
  
    expect(res.status).toBe(200);
    expect(res.headers['set-cookie']).toBeDefined();
  
    const setCookieHeader = res.headers['set-cookie'];
    if (!setCookieHeader) throw new Error('Cookieが返されませんでした');
    if (!Array.isArray(setCookieHeader)) throw new Error('Cookieが配列ではありません');
  
    cookie = setCookieHeader;
  });

  it('✅ ログイン済みの状態で /me にアクセスできる', async () => {
    const res = await request(app)
      .get('/me')
      .set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toBe(testEmail);
  });

  it('❌ ログインしていないと /me は 401 を返す', async () => {
    const res = await request(app).get('/me');
    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/ログインが必要です/);
  });

  it('❌ 間違ったパスワードではログインできない', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: testEmail, password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/一致しません/);
  });

  it('❌ 存在しないユーザーではログインできない', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'noexist@example.com', password: 'anypass' });

    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/見つかりません/);
  });

  it('✅ /logout 実行後に /me はアクセス不可（セッション破棄）', async () => {
    const logoutRes = await request(app)
      .post('/logout')
      .set('Cookie', cookie);

    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body.message).toMatch(/ログアウト/);

    const meRes = await request(app)
      .get('/me')
      .set('Cookie', cookie);

    expect(meRes.status).toBe(401);
  });
});
