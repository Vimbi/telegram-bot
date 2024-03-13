import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovizorService } from './movizor.service';

@Module({
  imports: [HttpModule.register({})],
  providers: [MovizorService, Logger],
  exports: [MovizorService],
})
export class MovizorModule {}
