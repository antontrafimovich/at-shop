import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { BaseLayoutComponent } from "./layouts/base-layout/base-layout.component";

@NgModule({
    declarations: [BaseLayoutComponent],
    imports: [CommonModule, SharedModule],
    exports: [BaseLayoutComponent]
})
export class CoreModule {}
