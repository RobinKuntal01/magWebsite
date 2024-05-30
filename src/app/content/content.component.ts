import { Component,OnInit ,ViewChild,ElementRef} from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClient } from '@angular/common/http';
import { MagServiceService } from '../services/mag-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  magazineID:any;
  latestMagazine:any;
  readMagazine: any;
  pdfUrl = '';
  title:any
  constructor(
    private apiServices: ApiServiceService,
    private magService: MagServiceService,
    private http: HttpClient,
    private modalservice: NgbModal,
  ) {}

  @ViewChild('content') popupview!: ElementRef;

  ngOnInit(): void {
    this.apiServices.getArticles().subscribe((data: any) => {
      this.articles = data.allArticles;
      // Assign the latest article
      if (this.articles.length > 0) {
        this.latestArticle = this.articles[this.articles.length - 1];
      }
    });
    this.magService.getMagazines().subscribe((data: any) => {
      this.magazines = data.allMagazine;
  console.log(this.magazines)
      if(this.magazines.length > 0){
        this.latestMagazine = this.magazines[this.magazines.length - 1];
      }
    });
  }
  readMore(magazineID: number) {
    this.magService.getMagazineById(magazineID).subscribe((data: any) => {
      this.readMagazine = data.readMoreMagazine
      this.title = this.readMagazine.title
      this.magazineID = magazineID
      let url = this.readMagazine.magazinePDF
      this.pdfUrl = url
      console.log(this.pdfUrl);
      this.modalservice.open(this.popupview, { size: 'lg' })
    });
  }
  
}