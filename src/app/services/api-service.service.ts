import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private article_url = 'https://api.digitalbusinessreview.com/api/v1/article'
  // private article_url = 'https:// api.digitalbusinessreview.com/api/v1/article/663be42552395e9e43e43d5b'
  // private article_url = 'https://refactored-cod-qj7w7jg7pvx34449-3000.app.github.dev/api/v1/article'

 
  constructor(private http : HttpClient, ) { }
  getArticles(){
    return this.http.get(this.article_url);
  }

  destroyArticle(articleID:string){
    console.log(articleID);
    
    return this.http.delete(`https://api.digitalbusinessreview.com/api/v1/article/${articleID}`)
    // return this.http.delete(`https://refactored-cod-qj7w7jg7pvx34449-3000.app.github.dev/api.v1/article/${articleID}`)

  }

  getArticleById(articleID:string){
    console.log(articleID);
    return this.http.get(`https://api.digitalbusinessreview.com/api/v1/article/${articleID}`)
    
  }

}