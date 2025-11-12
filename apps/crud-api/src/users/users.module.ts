import { Module } from "@repo/core";

import { UsersController } from "./controllers/users.controller";
import { UserService } from "./services/user.service";

@Module({
  providers: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}