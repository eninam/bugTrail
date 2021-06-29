import {
  Injectable,
  NotAcceptableException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue, IssueDocument } from './schemas/issue.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { ProjectService } from '../project/project.service';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name)
    private issueModel: Model<IssueDocument>,
    private userService: UserService,
    private projectService: ProjectService
  ) {}
  async create(createIssueDto: CreateIssueDto) {
    console.log('This action adds a new issue');
    const {
      title,
      description,
      status,
      priority,
      due_date,
      assignedTo,
      project,
      createdByName,
      createdByEmail,
    } = createIssueDto;
    const foundIssue = await this.findOne(title);
    if (foundIssue) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error:
            'ticket with the same title has already been created, change the title of the ticket',
        },
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    const assignedUser = await this.userService.findOne(assignedTo);
    const assignedProject = await this.projectService.findOne(project);
    try {
      const newItem = new this.issueModel({
        title: title?.toLowerCase()?.trim(),
        description: description,
        status: status,
        priority: priority,
        due_date: due_date,
        assignedTo: assignedUser,
        project: assignedProject,
        projectName: assignedProject.projectName,
        assignedToEmail: assignedUser.email,
        createdByName: createdByName,
        createdByEmail: createdByEmail,
      });
      const result = await newItem.save();
      return result;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error:
            'could not create issue ' +
            createIssueDto.title +
            ' because of ' +
            err,
        },
        HttpStatus.NOT_ACCEPTABLE
      );
      // throw new NotAcceptableException(err.errors.name.message);
    }
  }

  async findAll() {
    console.log(`This action returns all issue`);
    const items = await this.issueModel.find({}).sort({ _id: -1 });
    return items;
  }

  async findOne(id: string) {
    console.log(`This action returns a #${id} issue`);
    const foundIssue = await this.issueModel.findOne({
      title: id?.toLowerCase()?.trim(),
    });
    return foundIssue;
    // if (foundIssue) {
    //   console.log(foundIssue);
    //   return foundIssue;
    // } else {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.NOT_ACCEPTABLE,
    //       error: 'could not find issue ' + id,
    //     },
    //     HttpStatus.NOT_ACCEPTABLE,
    //   );
    // }
  }

  async update(id: string, updateIssueDto: UpdateIssueDto) {
    console.log(`This action updates a #${id} issue`);
    const {
      title,
      description,
      status,
      priority,
      due_date,
      assignedTo,
      project,
      updatedBy,
    } = updateIssueDto;
    const foundIssue = await this.findOne(id);
    if (!foundIssue) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'could not find issue of name: ' + id,
        },
        HttpStatus.NOT_FOUND
      );
    }
    if (title) {
      foundIssue.title = title;
    }
    if (description) {
      foundIssue.description = description;
    }
    if (status) {
      foundIssue.status = status;
    }
    if (priority) {
      foundIssue.priority = priority;
    }
    if (due_date) {
      foundIssue.due_date = due_date;
    }
    if (assignedTo) {
      const assignedUser = await this.userService.findOne(assignedTo);
      foundIssue.assignedTo = assignedUser;
      foundIssue.assignedToEmail = assignedUser.email;
    }
    if (project) {
      const assignedProject = await this.projectService.findOne(project);
      foundIssue.project = assignedProject;
      foundIssue.projectName = project;
    }
    foundIssue.updatedBy = updatedBy;
    await foundIssue.save();
    return foundIssue;
  }

  remove(id: string) {
    return `This action removes a #${id} issue`;
  }
}
