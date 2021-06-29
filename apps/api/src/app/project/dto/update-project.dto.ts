import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { User } from '../../user/schemas/user.schema';
import { Issue } from '../../issue/schemas/issue.schema';
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  projectName: string;
  projectDescription: string;
  assignedUser: string;
  // issue: string;
}
