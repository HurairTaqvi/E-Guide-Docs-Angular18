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
  rightbarlist: any[] = [];
  headingsList: any[] = [];
  RightBarHeadingID: any[] = [];

  constructor(
    private sharingService: SharingService,
    private activatedroute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object // Injecting platform ID
  ) {}

  ngOnInit(): void {
    // Check if the current platform is a browser
    if (isPlatformBrowser(this.platformId)) {
      let sessionStorage: Storage = window.sessionStorage;

      // Get the ID from query params and fetch content data
      this.activatedroute.queryParams.subscribe((param: any) => {
        const id = +param.id; // Get the ParentID from the URL
        sessionStorage.setItem('myParam', JSON.stringify(id));

        let ParamId = sessionStorage.getItem('myParam');

        // Fetch data based on ParentID
        this.sharingService.getContentData().subscribe({
          next: (res) => {
            const filteredData = res.filter(
              (item: any) => item.ParentID === id
            );
            this.contentData = filteredData; // Populate the contentData array

            if (ParamId) {
              // Convert ParamId back to number and pass to selectCategory
              const numericParamId = JSON.parse(ParamId);

              // Assuming selectCategory expects a number, pass it directly
              this.selectCategory(numericParamId);
            }

            // Handle specific cases for ParamId
            if (ParamId === '1') {
              this.selectContent(101);
            } else if (ParamId === '2') {
              this.selectContent(202);
            } else if (ParamId === '3') {
              this.selectContent(302);
            }
          },
        });
      });
    }
  }

  // Function to handle category selection and fetch child elements
  selectCategory(id: number): void {
    // Fetch new data for the selected category and update the SubList
    this.sharingService.getContentData().subscribe({
      next: (res) => {
        const selectedItem = res.find((item: any) => item.ID === id);
        // If the item has a child header, populate the SubList
        this.SubList = selectedItem?.ChildHeader || []; // Clear SubList if no child headers exist
      },
    });
  }

  // Function to handle content selection and update page content
  selectContent(id: number): void {
    this.sharingService.getContentData().subscribe({
      next: (res) => {
        const selectedItem = res.find((item: any) => item.ID === id);

        if (selectedItem && selectedItem.ParentBody) {
          const x = selectedItem.ParentBody; // Main Body
          this.ChildID = selectedItem.ChildHeader ? 0 : selectedItem.ID; // ID from the Parent

          if (!selectedItem.ChildHeader) {
            this.rightbarlist = [];
            this.PageContent = x; // Main Array of ParentBody

            // Populate rightbarlist
            x.forEach((j: any) => {
              Object.keys(j).forEach((key) => {
                if (key.includes('heading')) {
                  this.rightbarlist.push(j[key]);
                }
              });
            });
          } else {
            this.rightbarlist = [];
            const ChildBody = selectedItem.ChildHeader;

            //
            //
            //
            //
            //
            //

            ChildBody.forEach((e: any) => {
              this.ChildID = e.ChildID; // ID from the Child
              this.PageContent = e.ChildBody; // Main Array of ChildBody

              // Populate rightbarlist for ChildBody
              e.ChildBody.forEach((i: any) => {
                Object.keys(i).forEach((key) => {
                  if (key.includes('heading')) {
                    this.rightbarlist.push(i[key]);
                  }
                });
              });
            });
          }
        } else {
          this.PageContent = []; // Clear PageContent if no content exists
        }
      },
    });
  }

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
