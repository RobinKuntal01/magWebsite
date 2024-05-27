import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ArticlesComponent } from './articles/articles.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthGuard } from './guard/auth.guard';
import { AddMagazineComponent } from './add-magazine/add-magazine.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { DisplayMagazineComponent } from './display-magazine/display-magazine.component';
const routes: Routes = [ 
                         {path: '', component: ContentComponent},
                         {path:'articles', component: ArticlesComponent},
                         {path:'addarticles', component:AddArticleComponent, canActivate:[AuthGuard]},
                         {path:'contactus', component:ContactUsComponent},
                         {path:'footer', component:FooterComponent},
                         {path:'login',component:LoginComponent},
                         {path:'aboutus',component:AboutusComponent},
                         {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
                          {path:'addMagazines', component:AddMagazineComponent, canActivate:[AuthGuard]},
                          {path:'readmore/:id',component:ReadMoreComponent},
                          {path:'readmore/:magazineID',component:ReadMoreComponent},
                          {path:'magazine',component:DisplayMagazineComponent},
                  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
