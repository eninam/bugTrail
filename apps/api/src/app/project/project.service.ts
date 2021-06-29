import {
  Injectable,
  NotAcceptableException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Project, ProjectDocument } from './schemas/project.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { IssueService } from '../issue/issue.service';
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>,
    private userService: UserService
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    const project = await this.findOne(createProjectDto.projectName);
    if (project) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error:
            'A project with this name already exist, please change the name and try again',
        },
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    console.log('This action adds a new project');
    try {
      const newItem = new this.projectModel(createProjectDto);
      const result = await newItem.save();
      return result;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error:
            'could not create project ' +
            createProjectDto.projectName +
            ' because of ' +
            err,
        },
        HttpStatus.NOT_ACCEPTABLE
      );
      // throw new NotAcceptableException(err.errors.name.message);
    }
  }
  async deleteAssignedUser(projectName, userID) {
    const project = await this.findOne(projectName);
    if (!project) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'could not find project ' + projectName,
        },
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    for (let i = 0; i < project.assignedUsers.length; i++) {
      const user = project.assignedUsers[i];
      // console.log('user in service ', user, ' userID ', userID);

      if (user == userID) {
        // console.log('before splice ', project.assignedUsers.length);
        project.assignedUsers.splice(i, 1);
        project.markModified('User');
        await project.save();
        // doc.array.set(3, 'changed');
        // project.assignedUsers.set(i, 'changed');

        // console.log('after splice ', project.assignedUsers.length);
        // console.log('user in service ', user, ' userID ', userID);
        return user;
      }
    }
    // await project.assignedUsers.save();
    // project.markModified('User');
    // order.markModified('lines');

    return null;
  }
  async findAll() {
    console.log(`This action returns all project`);
    const items = await this.projectModel.find({});
    //  console.log(items);
    return items;
  }

  async findOne(id: string) {
    console.log(`This action returns a #${id} project`);
    const foundItem = await this.projectModel.findOne({
      projectName: id?.trim()?.toLowerCase(),
    });
    return foundItem;
    // if (foundItem) {
    //   // console.log(foundItem);
    //   // foundItem.populate({ path: 'User' });
    //   console.log('assigned user length ', foundItem.assignedUsers.length);
    //   // foundItem.populate('User');
    //   return foundItem;
    // } else {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.NOT_ACCEPTABLE,
    //       error: 'could not find project ' + id,
    //     },
    //     HttpStatus.NOT_ACCEPTABLE,
    //   );
    // }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    console.log(`This action updates a #${id} project`, updateProjectDto);
    const { projectName, projectDescription, assignedUser } = updateProjectDto;
    const foundProject = await this.findOne(id);
    if (projectName) {
      foundProject.projectName = projectName;
    }
    if (projectDescription) {
      foundProject.projectDescription = projectDescription;
    }
    if (assignedUser) {
      const foundUser = await this.userService.findOne(assignedUser);
      foundProject.assignedUsers.push(foundUser);
    }
    // if(issue){
    //   const foundIssue = await this.issueService.findOne(issue);
    //   foundProject.issues.push(foundIssue);
    // }
    await foundProject.save();
    return foundProject;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
