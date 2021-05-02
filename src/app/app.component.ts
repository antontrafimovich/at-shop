import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styles: []
})
export class AppComponent {
    title = "finances";

    public anton(): void {
        this.title = "anton";
    }
}
