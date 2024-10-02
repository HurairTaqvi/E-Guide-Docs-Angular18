import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharingService } from '../../core/sharing-service/sharing.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule, NzMenuModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
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
    private activatedroute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // Get the ID from query params and fetch content data
    this.activatedroute.queryParams.subscribe((param: any) => {
      const id = +param.id; // Get the ParentID from the URL

      // Fetch data based on ParentID
      this.sharingService.getContentData().subscribe({
        next: (res) => {
          const filteredData = res.filter((item: any) => item.ParentID === id);
          this.contentData = filteredData; // Populate the contentData array
          // console.log('Content Data:', JSON.stringify(this.contentData));
          this.selectCategory(1);
          this.selectContent(101);
        },
      });
    });
  }

  // Function to handle category selection and fetch child elements
  selectCategory(id: number): void {
    // console.log('Selected Category ID:', id);
    // Fetch new data for the selected category and update the SubList
    this.sharingService.getContentData().subscribe({
      next: (res) => {
        const selectedItem = res.find((item: any) => item.ID === id);
        // If the item has a child header, populate the SubList
        if (
          selectedItem &&
          selectedItem.ChildHeader &&
          selectedItem.ChildHeader.length > 0
        ) {
          this.SubList = selectedItem.ChildHeader;
          // console.log('SubList:', this.SubList);
        } else {
          // console.log('No sublist found.');
          this.SubList = []; // Clear SubList if no child headers exist
        }
      },
    });
  }

  // Function to handle content selection and update page content
  selectContent(id: number): void {
    this.sharingService.getContentData().subscribe({
      next: (res) => {
        const selectedItem = res.find((item: any) => item.ID === id);
        console.log(selectedItem);

        if (selectedItem && selectedItem.ParentBody) {
          // Main Body
          const x = selectedItem.ParentBody;

          // Dynamic Data for Body JSON
          if (!selectedItem.ChildHeader) {
            this.rightbarlist = [];
            this.ChildID = selectedItem.ID; //ID from the Parent
            // console.log('If' + this.ChildID);
            this.PageContent = x; //Main Array of ParentBody
            console.log(this.PageContent);

            // //Parent Right Bar
            x.map((j: any) => {
              Object.keys(j).forEach((key) => {
                if (key.includes('heading')) {
                  this.rightbarlist.push(j[key]);
                }
              });
            });

            //Right Bar Scroll Function Child Body
          } else {
            this.rightbarlist = [];

            const ChildBody = selectedItem.ChildHeader;
            ChildBody.map((e: any) => {
              this.ChildID = e.ChildID; //ID from the Child
              // console.log('Else' + this.ChildID);
              const ChildBody = selectedItem.ChildHeader;
              ChildBody.map((e: any) => {
                this.PageContent = e.ChildBody; //Main Array of ChildBody

                // //Child Right Bar
                e.ChildBody.map((i: any) => {
                  Object.keys(i).forEach((key) => {
                    if (key.includes('heading')) {
                      this.rightbarlist.push(i[key]);
                    }
                  });
                });

                //Right Bar Scroll Function Main Body
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
    // Find the heading in PageContent that matches itemHeading
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
