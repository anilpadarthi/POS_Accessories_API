import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubCategoryService } from '../../../../shared/services/subCategory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Response } from 'src/app/shared/models/response';
import { MessageService } from 'src/app/shared/services/message.service';
import { LookupService } from 'src/app/shared/services/lookup.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})

export class AddSubCategoryComponent implements OnInit {
  public form: UntypedFormGroup;
  private sub: any;
  subCategoryId: number = 0;
  categories: any[];

  constructor(
    public router: Router,
    public fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private subCategoryService: SubCategoryService,
    public snackBar: MatSnackBar,
    private lookupService: LookupService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'categoryId': null,
      'subCategoryId': 0,
      'subCategoryName': [null, Validators.required],
      'images': null
    });

    this.sub = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.subCategoryId = parseInt(params['id']);
        this.loadData();
      }
    });
    this.getCategoryLookup();
  }

  public loadData() {
    this.subCategoryService.getSubCategory(this.subCategoryId).subscribe((res: any) => {
      this.form.patchValue(res.data);
    });
  }

  getCategoryLookup() {
    this.lookupService.getCategories().subscribe(res => {
      this.categories = res.data;
    });
  }

  public navigateToCateogryList() {
    this.router.navigate(['/sub-category']);
  }


  public onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.subCategoryId === 0) {
        this.subCategoryService.addSubCategory(this.form.value).subscribe({
          next: (res: Response) => {
            if (res.status) {
              this.navigateToCateogryList();
              this.messageService.showSuccess(res.data);
            }
            else {
              this.messageService.showError(res.data);
            }
          },
          error: (e) => {
            console.log(e);
            this.messageService.showError('Unable to create Category');
          }
        })
      }
      else {
        this.subCategoryService.updateSubCategory(this.form.value).subscribe({
          next: (res: Response) => {
            if (res.status) {
              this.navigateToCateogryList();
              this.messageService.showSuccess(res.data);
            }
            else {
              this.messageService.showError(res.data);
            }
          },
          error: (e) => {
            console.log(e);
            this.messageService.showError('Unable to update Category');
          }
        })
      }

    }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
