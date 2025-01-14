import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { Observer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './category.component.html',
    styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

    private categoryService = inject(CategoryService);
    public dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);

    ngOnInit(): void {
        this.getCategories();
    }

    displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
    dataSource = new MatTableDataSource<CategoryElement>();

    getCategories(): void {

        const observer: Observer<any> = {
            next: (data) => {
                console.log('Respuesta categories:', data);
                this.processCategoriesResponse(data)
            },
            error: (error) => {
                console.error('Error:', error);
            },
            complete: () => {
                console.log('Solicitud completada.');
            }
        };

        this.categoryService.getCategories()
            .subscribe(observer)
    }

    processCategoriesResponse(resp: any) {
        const dataCategory: CategoryElement[] = [];

        if (resp.metadata[0].code == "00") {
            let listCategory = resp.categoryResponse.category;

            listCategory.forEach((element: CategoryElement) => {
                dataCategory.push(element);
            });

            this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
        }
    }

    openCategoryDialog() {
        const dialogRef = this.dialog.open(NewCategoryComponent, {
            width: '450px'
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if(result == 1) {
                this.openSnackBar("Categoria agregada", "Exitosa");
                this.getCategories();
            } else if (result == 2) {
                this.openSnackBar("Se produjo un eror al guardar categoria", "Error");
            }
        });
    }

    openEdit(id: number, name: string, description: string) {
        const dialogRef = this.dialog.open(NewCategoryComponent, {
            width: '450px',
            data: {id: id, name: name, description: description}
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if(result == 1) {
                this.openSnackBar("Categoria actualizada", "Exitosa");
                this.getCategories();
            } else if (result == 2) {
                this.openSnackBar("Se produjo un eror al actualizar categoria", "Error");
            }
        });
    } 

    openDelete(id: any) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {id: id}
        });

        dialogRef.afterClosed().subscribe((result: any) => {
            if(result == 1) {
                this.openSnackBar("Categoria eliminada", "Exitosa");
                this.getCategories();
            } else if (result == 2) {
                this.openSnackBar("Se produjo un eror al eliminar categoria", "Error");
            }
        });
    }

    search(termino: string) {
        if (termino.length === 0) {
            return this.getCategories();
        }

        const observer: Observer<any> = {
            next: (data) => {
                console.log('Respuesta categories:', data);
                this.processCategoriesResponse(data)
            },
            error: (error) => {
                console.error('Error:', error);
            },
            complete: () => {
                console.log('Solicitud completada.');
            }
        };

        this.categoryService.getCategoryById(termino)
            .subscribe(observer)
    }

    openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(message, action, {
            duration: 2000
        })
    }
}

export interface CategoryElement {
    id: number;
    name: string;
    description: string;
}