import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { LoginExComponent } from "./login-ex/login-ex.component";
import { FabEasyComponent } from "./fab-easy/fab-easy.component";
import { AuthGuardService } from "./services/authguard.service";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
    { path: "login-ex", component: LoginExComponent},
    { path: "fab-easy", component: FabEasyComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
