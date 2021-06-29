import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Project } from '../../project/schemas/project.schema';
import * as mongoose from 'mongoose';

export type IssueDocument = Issue & Document;

@Schema()
export class Issue {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true }) // status can be started, in progress, finished -- drop down
  status: string;
  @Prop({ required: true, default: 'low' }) // priority can be low medium high -- drop down
  priority: string;
  @Prop({ required: true })
  due_date: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  assignedTo: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Project.name,
  })
  project: Project;
  @Prop()
  projectName: string;
  @Prop()
  userName: string;
  @Prop()
  createdByName: string;
  @Prop()
  createdByEmail: string;
  @Prop()
  updatedBy: string;
}
export const IssueSchema = SchemaFactory.createForClass(Issue);
