import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface Article {
  _id: string;
  imageArticle: string;
  title: string;
  content: string;
  createdAt: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  articleID: string = '';
  readArticle: any;
  isAdminLoggedIn: boolean = false;
  page: number = 1;

  constructor(
    private apiServices: ApiServiceService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiServices.getArticles().subscribe((data: any) => {
      this.articles = data.allArticles;
    });
    this.authService.isUserLoggedIn.subscribe((isUserLoggedIn) => {
      this.isAdminLoggedIn = isUserLoggedIn;
    });
  }

  readMore(articleID: string) {
    this.apiServices.getArticleById(articleID).subscribe((data: any) => {
      this.readArticle = data.readMoreArticle;
      console.log(articleID);
      this.router.navigate(['/readmore', articleID]);
    });
  }

  deleteArticle(articleID: string) {
    this.apiServices.destroyArticle(articleID).subscribe(
      (data: any) => {
        this.ngOnInit();
        console.log(articleID);
        alert('Article deleted successfully!');
      },
      (error: any) => {
        console.error('Error deleting article', error);
        alert('Failed to delete the article.');
      }
    );
  }
  
}
