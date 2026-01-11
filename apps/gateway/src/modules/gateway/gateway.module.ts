import { Module } from "@nestjs/common";
import { CoreModule } from "@/core/core.module";
import { AuthController } from "@/modules/gateway/controllers/auth.controller";
import { AuthService } from "@/modules/gateway/services/auth.service";

@Module({
  imports: [CoreModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class GatewayModule {}
