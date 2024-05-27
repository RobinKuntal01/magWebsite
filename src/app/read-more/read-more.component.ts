import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ArticlesComponent } from '../articles/articles.component';
@Component({
  selector: 'app-read-more',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent {
  article: any;
  articleByID: any;
  articleID:string=''
  readArticle:any;
  isAdminLoggedIn: boolean = false;
  constructor(
    private apiServices: ApiServiceService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router :Router  ) {}
    ngOnInit(): void {
      const articleID = this.route.snapshot.paramMap.get('id');
      console.log(articleID);
      if (articleID) {
        this.apiServices.getArticleById(articleID).subscribe(
          (data: any) => {
            console.log('API Response:', data); // Log the entire API response
            this.articleByID = data.readMoreArticle; // Correctly assign the nested readMoreArticle object
            console.log(this.articleByID); // Log the article details
          },
          (error) => {
            console.error("Error fetching article:", error);
            // Handle error, e.g., redirect to another page or show an error message
          }
        );
      } else {
        console.error("Invalid article ID");
        // Handle the case where articleID is null, e.g., redirect to another page or show an error message
        this.router.navigate(['/articles']);
      }
    }
  }