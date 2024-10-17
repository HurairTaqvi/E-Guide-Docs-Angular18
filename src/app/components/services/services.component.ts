import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharingService } from '../../core/sharing-service/sharing.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule, NzMenuModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'], // Fixed 'styleUrl' to 'styleUrls'
})
export class ServicesComponent implements OnInit {
  contentData: any[] = [];
  parentContent: any[] = [];
  SubList: any[] = [];
  PageContent: any[] = [];
  ChildID: number = 0;
  SubChild: number = 0;
  rightbarlist: any[] = [];
  headingsList: any[] = [];
  RightBarHeadingID: any[] = [];
  ContentApiResponse: any[] = [];
  ContentApiResponseCode: string = '';
  ContentApiResponseMessage: string = '';
  ContentApiData: any[] = []; // Main Source Array for Data
  ShowContentApiData: any[] = [];
  ParentIDValue: number = 1;

  constructor(
    private sharingService: SharingService,
    private activatedroute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object // Injecting platform ID
  ) {}

  ngOnInit(): void {
    // Check if the current platform is a browser
    if (isPlatformBrowser(this.platformId)) {
      const sessionStorage: Storage = window.sessionStorage;

      // Get the ID from query params and fetch content data
      this.activatedroute.queryParams.subscribe((param: any) => {
        const id = +param.id; // Get the ParentID from the URL
        sessionStorage.setItem('myParam', JSON.stringify(id));
        const ParamId = sessionStorage.getItem('myParam');

        // Fetch data from the API
        this.sharingService.getApiData().subscribe({
          next: (res: any) => {
            const response = JSON.parse(res?.Result?.Response)[0];
            this.ContentApiResponseCode = response.Code;
            this.ContentApiResponseMessage = response.Message;

            if (this.ContentApiResponseCode === '00') {
              const dataMain = res?.Result?.Data;
              const parsedData = JSON.parse(dataMain);
              this.ContentApiData = parsedData[0].Dataa; // Main Source Array for Data
              // Filter data by ParentID

              const findingParentId = this.ContentApiData.filter(
                (item: any) => (this.ParentIDValue = item.ParentID)
              );

              console.log(findingParentId[0]);
              // console.log(findingParentId[0].ParentID);
              // let ParentIDValue: number; // Declare the variable
              // this.ParentIDValue(findingParentId);

              const filteredData = this.ContentApiData.filter(
                (item: any) => item.ParentID === id
              );
              this.contentData = filteredData; // Populate the leftsidebar array
              if (ParamId !== null && ParamId !== 'undefined') {
                const numericParamId = JSON.parse(ParamId);
                this.selectCategory(numericParamId, numericParamId);

                // // Handle specific cases for ParamId
                if (ParamId === '1') {
                  this.selectContent(1, 1);
                } else if (ParamId === '2') {
                  this.selectContent(2, 1);
                } else if (ParamId === '3') {
                  this.selectContent(3, 1);
                }
                 else if (ParamId === '4') {
                  this.selectContent(4, 3);
                }
              } else {
                console.log('Directory link not found');
              }
            } else {
              // this.contentData = [];
              console.log(this.ContentApiResponseMessage);
            }
          },
        });
      });
    }
  }

  // Function to handle category selection and fetch child elements
  selectCategory(id: number, id2: number): void {
    // console.log(id, id2);
    const selectedItem = this.ContentApiData.find(
      (item: any) => item.ID === id
    );

    this.SubList = selectedItem?.ChildHeader || []; // Clear SubList if no child headers exist
  }

  // Function to handle content selection and update page content
  selectContent(id: number, id2: number): void {
    // console.log(id, id2);
    const selectedItem = this.ContentApiData.find(
      (item: any) => item.ID === id
    );

    if (selectedItem.ParentBody !== null && selectedItem.ChildHeader === null) {
      const x = selectedItem.ParentBody; // Main Body
      this.ChildID = selectedItem.ChildHeader ? 0 : selectedItem.ID; // ID from the Parent
      this.rightbarlist = [];
      this.PageContent = x;
      // Populate rightbarlist
      x.forEach((j: any) => {
        Object.keys(j).forEach((key) => {
          if (key.includes('heading')) {
            this.rightbarlist.push(j[key]);
          }
        });
      });
    } else if (
      selectedItem.ParentBody === null &&
      selectedItem.ChildHeader !== null
    ) {
      const ChildElement = selectedItem.ChildHeader;
      const MatchingIDofMain = ChildElement.find(
        (item: any) => item.ChildID === id
      );

      if (MatchingIDofMain) {
        const MatchingIDofSub = ChildElement.find(
          (item: any) => item.ID === id2
        );
        this.SubChild = MatchingIDofSub?.ID; // ID of SubMenu Items
        if (MatchingIDofSub?.ChildBody) {
          this.rightbarlist = [];
          this.PageContent = MatchingIDofSub.ChildBody;

          // //Populate rightbarlist
          this.PageContent.forEach((j: any) => {
            Object.keys(j).forEach((key) => {
              if (key.includes('heading')) {
                this.rightbarlist.push(j[key]);
              }
            });
          });
        } else {
          this.rightbarlist = [];
          this.PageContent = [];
          console.log('ChildData is not showing');
        }
      }
    } else {
      console.log('Data is not showing');
      this.PageContent = []; // Clear PageContent if no content exists
    }
  }

  // Function to scroll to specific headings
  Scrolltotext(itemHeading: string): void {
    const headingElement = this.PageContent.flatMap((item) =>
      Object.keys(item)
        .filter((key) => key.includes('heading') && item[key] === itemHeading)
        .map((key) => item[key])
    )
      .map((heading) => document.getElementById(heading))
      .find((element) => element);

    if (headingElement) {
      headingElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else {
      console.warn(`Heading "${itemHeading}" not found.`);
    }
  }
}
