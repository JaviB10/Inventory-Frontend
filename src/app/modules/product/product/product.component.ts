import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';
import { Observer } from 'rxjs';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './product.component.html',
    styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

    private productService = inject(ProductService);

    ngOnInit(): void {
        this.getProducts();
    }

    displayedColumns: string[] = ['id', 'name', 'price', 'amount', 'category', 'picture', 'actions'];
    dataSource = new MatTableDataSource<ProductElement>();
        
    @ViewChild(MatPaginator) paginator!: MatPaginator

    getProducts(): void {

        const observer: Observer<any> = {
            next: (data) => {
                console.log('Respuesta categories:', data);
                this.processProductsResponse(data)
            },
            error: (error) => {
                console.error('Error:', error);
            },
            complete: () => {
                console.log('Solicitud completada.');
            }
        };

        this.productService.getProducts()
            .subscribe(observer)
    }

    processProductsResponse(resp: any) {
        const dataProduct: ProductElement[] = [];

        if (resp.metadata[0].code == "00") {
            let listProduct = resp.productResponse.products;

            listProduct.forEach((element: ProductElement) => {
                if (typeof element.category === 'object' && element.category?.name) {
                    // Si category es un objeto, extraemos el nombre
                    element.category = element.category.name;
                } else if (typeof element.category === 'string') {
                    // Si category ya es un string, lo dejamos como está
                    element.category = element.category;
                } else {
                    // Si no hay categoría válida, asignamos un valor predeterminado
                    element.category = 'Sin categoría';
                }
                const base64Prefix = 'data:image/jpeg;base64,';

                if (element.picture && !element.picture.startsWith(base64Prefix)) {
                    element.picture = base64Prefix + element.picture;
                }
                
                dataProduct.push(element);
            });

            this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
            this.dataSource.paginator = this.paginator;
        }
    }
}

export interface ProductElement {
    id: number;
    name: string;
    price: number;
    amount: number;
    category: string | { id: number; name: string; description: string };
    picture: any;
}