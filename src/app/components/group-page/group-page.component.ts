import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDynamorow } from 'src/app/models/dynamorow.model';
import { IGroup } from 'src/app/models/group.model';
import { IParticipant } from 'src/app/models/participant.model';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {
  private sub: any;
  groupGuid: string;
  group: IGroup;
  participants: string[];

  constructor(
    private route: ActivatedRoute,
    private _apiService: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    const _ = this.route.params.subscribe(async params => {
      this.groupGuid = decodeURIComponent(params['id']);
    })
    await this.getGroup();
    this.participants =  await this.getParticipants();
  }

  async getGroup(): Promise<void>{
    console.log(this.groupGuid)
    // TODO: API call to return group
    // this.group =  { groupName: "Lemons Deal Double", groupDeadline: new Date("2021-04-04"), groupDescription: "Have Fun!", dollarMinimum: 0, dollarMaximum: 50 }
    let row = <IDynamorow>{}
    let res = await this._apiService.getGroups(row)

    res.forEach(element => {
      console.log(element)
      let g = JSON.parse(element)
      if (g.groupName == this.groupGuid){
        this.group = g
      }
    });
  }

  async getParticipants(): Promise<string[]>{
    let row = <IDynamorow>{
          groupName: this.group.groupName
    }
    
    let partipantNames = await this._apiService.getParticipants(row)
    return partipantNames
  }

}
