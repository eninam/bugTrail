import { User } from '../../user/schemas/user.schema';
import { Project } from '../../project/schemas/project.schema';
import { IsNotEmpty } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty() // status can be started, in progress, finished -- drop down
  status: string;
  @IsNotEmpty() // priority can be low medium high -- drop down
  priority: string;
  @IsNotEmpty()
  due_date: string;
  @IsNotEmpty()
  assignedTo: string;

  @IsNotEmpty()
  project: string;
  createdByName: string;
  createdByEmail: string;
}
