import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AppSettings, Settings } from 'src/app/app.settings';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationService } from 'src/app/shared/services/configuration.service'
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorConstants } from 'src/app/shared/models/paginator-constants';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.scss']
})
export class ConfigurationListComponent implements OnInit {

  public settings: Settings;
  searchText!: string | null;
  displayedColumns = ['ID', 'ConfigurationType', 'Amount', 'FromDate', 'ToDate', 'Status', 'Actions'];
  bogusDataSource = new MatTableDataSource<any>();
  tableDataSource: any[] = [];
  pageSize = PaginatorConstants.STANDARD_PAGE_SIZE;
  pageOptions = PaginatorConstants.LEAP_STANDARD_PAGE_OPTIONS;
  pageIndex = 0;
  totalCount!: number;

  constructor(
    public changeDetectorRefs: ChangeDetectorRef,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public appSettings: AppSettings,
    private configurationService: ConfigurationService,
    private messageService: MessageService
  ) {
    this.settings = this.appSettings.settings;
  }

  async ngOnInit(): Promise<void> {
    this.loadData();
  }

  loadData(): void {
    const request = {
      pageNo: this.pageIndex + 1,
      pageSize: this.pageSize,
      searchText: this.searchText
    };

    this.configurationService.getByPaging(request).subscribe((res) => {
      this.tableDataSource = res.data.results;
      this.totalCount = res.data.totalRecords;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  search(): void {
    this.pageIndex = 0;
    this.loadData();
  }

  onReset(): void {
    this.pageIndex = 0;
    this.searchText = null;
    this.loadData();
  }

  public openConfigurationDialog(data: any): void {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

  edit(id: any): void {
    this.router.navigateByUrl(`/configuration/edit/${id}`);
  }

  updateStatus(element) {
    element.status = !element.status;

  }

  public remove(category: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm",
        message: "Are you sure you want remove this configuration?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.tableDataSource.indexOf(category);
        if (index !== -1) {
          category.status = "D";
          this.configurationService.delete(category).subscribe({
            next: (res) => {
              if (res.status) {
                this.loadData();
                this.messageService.showSuccess("Deleted successfully.");
              }
              else {
                this.messageService.showError(res.data);
              }
            },
            error: (e) => {
              console.log(e);
              this.messageService.showError('Unable to delete configuration');
            }
          })
        }
      }
    });
  }
}
