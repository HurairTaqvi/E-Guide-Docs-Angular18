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
  contentData: any[] = [];
  parentContent: any[] = [];
  SubList: any[] = [];
  PageContent: any[] = [];
  // rightbarlist: any[] = [];

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
        if (selectedItem && selectedItem.ParentBody) {
          // Main Body
          const x = selectedItem.ParentBody;

          //RightBar
          // const y = selectedItem.ParentBody.filter((e: any) =>
          //   e.indludes('heading')
          // );
          // console.log(y);

          if (!selectedItem.ChildHeader) {
            this.PageContent = x;
          } else {
            const ChildBody = selectedItem.ChildHeader;
            ChildBody.map((e: any) => {
              this.PageContent = e.ChildBody;
            });
          }
        } else {
          this.PageContent = []; // Clear PageContent if no content exists
        }
      },
    });
  }
  
  getHtmlContent(item: any): string {
    let html = '';
    if (item.heading) {
      html += `<h1>${item.heading}</h1>`;
    }
    if (item.para) {
      html += `<p>${item.para}</p>`;
    }
    if (item.heading2) {
      html += `<h2>${item.heading2}</h2>`;
    }
    if (item.para2) {
      html += `<p>${item.para2}</p>`;
    }
    if (item.para3) {
      html += `<p>${item.para3}</p>`;
    }
    return html;
  }

  trackByIndex(index: number, item: any) {
    return index;
  }
}
