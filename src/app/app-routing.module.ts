import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {HomePageComponent} from "./home-page/home-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";

const appRoutes: Route[] = [
  {path: '', component: HomePageComponent},
  {path: ':id/edit', component: EditPageComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
