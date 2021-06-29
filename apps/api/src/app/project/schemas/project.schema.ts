import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Issue } from '../../issue/schemas/issue.schema';
import * as mongoose from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  projectName: string;
  @Prop({ required: true })
  projectDescription: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  assignedUsers: User[];
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }] })
  // issues: Issue[];
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
