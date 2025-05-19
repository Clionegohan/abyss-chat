import { createUserService } from "../../../services/userServices";
import prisma from "../../../config/db";
import { generateValidUser } from "../../fixtures/user";

describe("User Service", () => {
  it("有効なユーザーを作成できること", async () => {
    const userData = generateValidUser();
    const user = await createUserService(userData);
    expect(user).toHaveProperty("id");
    expect(user.email).toBe(userData.email);
  });

  it("同一のメールアドレスでは登録できずエラーが表示されること", async () => {
    const userData1 = generateValidUser();
    const userData2 = generateValidUser();
    userData2.email = userData1.email;

    await createUserService(userData1);

    await expect(() =>
      createUserService(userData2)
    ).rejects.toThrow("そのメールアドレスは既に使われています。");
  });
});
