import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DmvService } from './dmv.service';

@Module({
  imports: [HttpModule.register({})],
  providers: [DmvService, Logger],
  exports: [DmvService],
})
export class DmvModule {}
