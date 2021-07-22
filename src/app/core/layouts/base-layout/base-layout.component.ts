import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
    selector: "app-base-layout",
    templateUrl: "./base-layout.component.html",
    styleUrls: ["./base-layout.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLayoutComponent implements OnInit {
    @Input() public title: string = "Anton";

    constructor() {}

    ngOnInit(): void {}
}
