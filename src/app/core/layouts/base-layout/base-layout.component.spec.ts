import { ComponentFixture, TestBed } from "@angular/core/testing";

import { runOnPushChangeDetection } from "./../../../../test/helper";
import { BaseLayoutComponent } from "./base-layout.component";

describe("BaseLayoutComponent", () => {
    let component: BaseLayoutComponent;
    let fixture: ComponentFixture<BaseLayoutComponent>;
    let h1: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BaseLayoutComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseLayoutComponent);
        component = fixture.componentInstance;
        h1 = fixture.nativeElement.querySelector("h1");
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should bind component's title to h1", () => {
        expect(h1.textContent).toContain(component.title);
    });

    it("should display different titiles", async () => {
        const newTitle = "New title";
        component.title = newTitle;
        await runOnPushChangeDetection(fixture);
        expect(h1.textContent).toContain(newTitle);
    });
});
