import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { RolesModule } from '../../services/roles/roles.module';
import { DisciplinesModule } from '../../services/disciplines/disciplines.module';
import { MembershipDetailsModule } from '../../services/membership-details/membership-details.module';
import { ParentsModule } from '../../services/parents/parents.module';

@Module({
  imports: [RolesModule,
    DisciplinesModule,
    MembershipDetailsModule,
    ParentsModule
  ],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogModule {}
