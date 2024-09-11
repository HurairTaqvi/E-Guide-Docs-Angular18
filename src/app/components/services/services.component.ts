import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharingService } from '../../core/sharing-service/sharing.service';
import { json } from 'express';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule, NzMenuModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  leftbarlist: any[] = [];
  rightbarlist: any[] = [];
  newsfeed: any[] = [];

  constructor(
    private sharingService: SharingService,
    private ativatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ativatedroute.queryParams.subscribe((param: any) => {
      this.leftbarlist = [];
      const id = +param.id;
      this.sharingService.getServiceData().subscribe({
        next: (res) => {
          // console.log(res);
          const x = res.find((item: any) => item.id === id);
          this.leftbarlist.push(x); // Names || LeftBar List
          // console.log('Testing:' + this.leftbarlist);
        },
      });
    });
  }

  selectedlist(id: number) {
    this.rightbarlist = [];
    this.newsfeed = [];

    // RightBar List
    this.leftbarlist.map((item) => {
      item.description.map((x: any) => {
        // const list = x.sidebarlist.find((y: any) => y.id === id);
        const list = x.sidebarlist; // Sidebarlist
        this.rightbarlist.push(list); // Sidebarlist || Rightbar
      });
    });

    console.log('this.rightbarlist:' + JSON.stringify(this.rightbarlist));
    //News Feed
    const jk = this.rightbarlist[0];
    console.log('this.rightbarlist:' + JSON.stringify(jk));
    jk.map((item: any) => {
      const desc = item.description;
      this.newsfeed.push(desc);
      console.log('desc:' + JSON.stringify(desc));
    });
  }
}
