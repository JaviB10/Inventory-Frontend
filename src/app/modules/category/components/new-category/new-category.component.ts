import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observer } from 'rxjs';

@Component({
    selector: 'app-new-category',
    standalone: true,
    imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './new-category.component.html',
    styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit{

    private categoryService = inject(CategoryService);
    public categoryForm!: FormGroup;
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef);
    
    ngOnInit(): void {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required]
        })
    }

    onSave() {
        let data = {
            name: this.categoryForm.get('name')?.value,
            description: this.categoryForm.get('description')?.value
        }

        const observer: Observer<any> = {
            next: (data) => {
                console.log(data);
                this.dialogRef.close(1)
            },
            error: (error: any) => {
                this.dialogRef.close(2)
            },
            complete: () => {
                console.log('Solicitud completada.');
            }
        };

        this.categoryService.saveCategories(data)
            .subscribe(observer)
    }

    onClose() {
        this.dialogRef.close(3);
    }
}
