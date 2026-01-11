import { Test, TestingModule } from "@nestjs/testing";
import { AuthHandleService } from "./auth-handle.service";

describe("AuthHandleService", () => {
  let controller: AuthHandleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthHandleService],
    }).compile();

    controller = module.get<AuthHandleService>(AuthHandleService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
