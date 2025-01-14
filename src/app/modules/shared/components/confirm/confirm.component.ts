import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CategoryService } from '../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observer } from 'rxjs';

@Component({
    selector: 'app-confirm',
    standalone: true,
    imports: [MaterialModule],
    templateUrl: './confirm.component.html',
    styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit{

    private categoryService = inject(CategoryService);
    private dialogRef = inject(MatDialogRef);
    public data = inject(MAT_DIALOG_DATA);

    ngOnInit(): void {
        
    }

    onNoClick() {
        this.dialogRef.close(3)
    }

    onDelete() {
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

        if (this.data != null) {
            this.categoryService.deleteCategories(this.data.id)
                .subscribe(observer)
        } else {
            this.dialogRef.close(2);
        }
    }

}
