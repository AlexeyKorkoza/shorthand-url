import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";
import type { SignUpRequestDto } from "@repo/api";

import {
  EXCHANGE_KEYS,
  ROUTING_KEYS,
} from "@/core/constants/rabbitmq.constant";

@Injectable()
export class AuthService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async register(signupDto: SignUpRequestDto) {
    await this.amqpConnection.publish(
      EXCHANGE_KEYS.AUTH,
      ROUTING_KEYS.AUTH.SIGN_UP,
      signupDto,
    );
  }
}
