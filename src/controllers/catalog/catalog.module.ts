import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { RolesModule } from '../../services/roles/roles.module';

@Module({
  imports: [RolesModule],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogModule {}
