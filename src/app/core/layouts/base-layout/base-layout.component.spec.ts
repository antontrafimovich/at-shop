import { ComponentFixture, TestBed } from "@angular/core/testing";

import { runOnPushChangeDetection } from "./../../../../test/helper";
import { BaseLayoutComponent } from "./base-layout.component";

describe("BaseLayoutComponent", () => {
    let component: BaseLayoutComponent;
    let fixture: ComponentFixture<BaseLayoutComponent>;
    let title: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BaseLayoutComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseLayoutComponent);
        component = fixture.componentInstance;
        title = fixture.nativeElement.querySelector(".app-base-layout-title");
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have title", () => {
        expect(title.textContent).toContain(component.title);
    });

    it("should display different titiles", async () => {
        const newTitle = "New title";
        component.title = newTitle;
        await runOnPushChangeDetection(fixture);
        expect(title.textContent).toContain(newTitle);
    });
});
