import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Issue } from '../../issue/schemas/issue.schema';
// import { Project } from '../../project/schemas/project.schema';
// import * as mongoose from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;
  @Prop()
  role: string;
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }] })
  // issues: Issue[];
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  // projects: Project[];
}
export const UserSchema = SchemaFactory.createForClass(User);
