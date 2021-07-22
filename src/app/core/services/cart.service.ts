import { Injectable } from "@angular/core";
import { from, merge, Observable, Subject } from "rxjs";
import { first, map, mapTo, scan, switchMap } from "rxjs/operators";

import { Product } from "../models";
import { Action, ActionType } from "./../../shared/model";

@Injectable({
    providedIn: "root"
})
export class CartService {
    private _productHasBeenAdded$: Subject<Product> = new Subject();
    private _productHasBeenRemoved$: Subject<Product> = new Subject();

    public products$: Observable<Product[]> = from(this.getProducts()).pipe(
        switchMap((prodcuts) =>
            merge(
                this._productHasBeenAdded$.pipe(
                    map((v) => this.getProductHasBeenAddedAction(v))
                ),
                this._productHasBeenRemoved$.pipe(
                    map((v) => this.getProductHasBeenAddedAction(v))
                )
            ).pipe(
                scan((result, action) => {
                    if (action.type === ActionType.Add) {
                        return this.addNewProdcutToProductsList(result, action.payload);
                    }

                    if (action.type === ActionType.Delete) {
                        return this.removeProdcutFromProductsList(result, action.payload);
                    }
                }, prodcuts)
            )
        )
    );

    constructor() {}

    public addProduct(v: Product): Promise<Product> {
        this._productHasBeenAdded$.next(v);

        return this.products$.pipe(first(), mapTo(v)).toPromise();
    }

    public removeProduct(v: Product): Promise<Product> {
        this._productHasBeenRemoved$.next(v);

        return this.products$.pipe(first(), mapTo(v)).toPromise();
    }

    private getProducts(): Promise<Product[]> {
        return new Promise((resolve, reject) =>
            setTimeout(
                () =>
                    resolve([
                        {
                            title: "A",
                            id: 0,
                            price: 10
                        },
                        {
                            title: "B",
                            id: 1,
                            price: 20
                        },
                        {
                            title: "C",
                            id: 2,
                            price: 30
                        }
                    ]),
                3000
            )
        );
    }

    private addNewProdcutToProductsList(
        products: Product[],
        product: Product
    ): Product[] {
        return [...products, product];
    }

    private removeProdcutFromProductsList(
        products: Product[],
        product: Product
    ): Product[] {
        const productIndex = products.findIndex((pr) => pr.id === product.id);
        if (productIndex === -1) {
            return products;
        }

        return [...products.slice(0, productIndex), ...products.slice(productIndex + 1)];
    }

    private getProductHasBeenAddedAction(v: Product): Action<Product> {
        return {
            type: ActionType.Add,
            payload: v
        };
    }

    private getProductHasBeenRemovedAction(v: Product): Action<Product> {
        return {
            type: ActionType.Delete,
            payload: v
        };
    }
}
