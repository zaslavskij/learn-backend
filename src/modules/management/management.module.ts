import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';

import { ManagementController } from './management.controller';

@Module({
  controllers: [ManagementController],
  imports: [UserModule],
})
export class ManagementModule {}
