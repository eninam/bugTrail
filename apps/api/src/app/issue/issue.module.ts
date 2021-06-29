import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Issue, IssueSchema } from './schemas/issue.schema';
import { UserModule } from '../user/user.module';
import { ProjectModule } from '../project/project.module';
// import { User, UserSchema } from './schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Issue.name, schema: IssueSchema }]),
    UserModule,
    ProjectModule,
  ],
  controllers: [IssueController],
  providers: [IssueService],
  exports: [IssueService, MongooseModule],
})
export class IssueModule {}
