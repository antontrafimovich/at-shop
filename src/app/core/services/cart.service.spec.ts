import { TestBed } from "@angular/core/testing";
import { first, map } from "rxjs/operators";
import { Product } from "../models";

import { CartService } from "./cart.service";

describe("CartService", () => {
    let service: CartService;

    beforeEach(async () => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CartService);
        await service.products$.pipe(first()).toPromise();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("#addProduct should return added item", async () => {
        const item: Product = {
            title: "A",
            id: 0,
            price: 10
        };

        const addedItem = await service.addProduct(item);

        expect(addedItem.id).toBe(item.id);
    });

    it("#removeProduct should return removed item", async () => {
        const item: Product = {
            title: "A",
            id: 0,
            price: 10
        };

        await service.addProduct(item);

        const removedItem = await service.removeProduct(item);

        expect(removedItem.id).toBe(item.id);
    });

    it("should have an ability to add item", async () => {
        const item: Product = {
            title: "A",
            id: 0,
            price: 10
        };

        const addedItem = await service.addProduct(item);

        const addedItemId = await service.products$
            .pipe(
                map((products) => products[products.length - 1].id),
                first()
            )
            .toPromise();

        expect(addedItem.id).toBe(addedItemId);
    });

    it("should have an ability to remove item", async () => {
        const firstItem: Product = {
            title: "A",
            id: -1,
            price: 10
        };

        const secondItem: Product = {
            title: "B",
            id: -2,
            price: 20
        };

        await service.addProduct(firstItem);
        await service.addProduct(secondItem);

        const removedItem = await service.removeProduct(firstItem);

        const removedItemIndex = await service.products$
            .pipe(
                first(),
                map((products) => products.findIndex((pr) => pr.id === removedItem.id))
            )
            .toPromise();

        expect(removedItemIndex).toBe(-1);
    });
});
