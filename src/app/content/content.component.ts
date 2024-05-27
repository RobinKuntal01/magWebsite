import { Component,OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { MagServiceService } from '../services/mag-service.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  articles:any[]=[];
  articleID: any;
  latestArticle: any;
  magazines:any[]=[];
  magazineId:any;
  latestMagazine:any;
  constructor(
    private apiServices: ApiServiceService,
    private magservice: MagServiceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.apiServices.getArticles().subscribe((data: any) => {
      this.articles = data.allArticles;
      // Assign the latest article
      if (this.articles.length > 0) {
        this.latestArticle = this.articles[this.articles.length - 1];
      }
    });
    this.magservice.getMagazines().subscribe((data: any) => {
      this.magazines = data.allMagazine;
  console.log(this.magazines)
      if(this.magazines.length > 0){
        this.latestMagazine = this.magazines[this.magazines.length - 1];
      }
    });
  }

  
}