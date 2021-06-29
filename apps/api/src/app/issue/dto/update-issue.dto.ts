import { PartialType } from '@nestjs/mapped-types';
import { CreateIssueDto } from './create-issue.dto';
import { User } from '../../user/schemas/user.schema';
// import { IsNotEmpty } from 'class-validator';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  assignedTo: string;
  project: string;
  updatedBy: string;
}
// an admin can create a project, they can add admins and developers to a project , ca add an issue to a project assigned to themselves
//    or a developer
// a developer can add themselves to a project, can add an issue assigned to themselves
