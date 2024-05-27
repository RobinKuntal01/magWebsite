import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent  {

  articleForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.articleForm = this.fb.group({
      title: [''],
      author: [''],
      content: [''],
      industry:[''],
      imageArticle: ['']
    });
  }
  
  onSubmit() {
    // Check if all required fields are filled
    if (this.articleForm.valid && this.selectedFile) {
      // Handle form submission
      const formData = new FormData();
      formData.append('title', this.articleForm.value.title);
      formData.append('author', this.articleForm.value.author);
      formData.append('content', this.articleForm.value.content);    
      formData.append('industry', this.articleForm.value.industry);    
      formData.append('imageArticle', this.selectedFile, this.selectedFile.name);
  
      // Send formData to your server using HttpClient
      this.http.post('https://api.digitalbusinessreview.com/api/v1/article/upload', formData).subscribe(
        response => {
          console.log('Server response:', response);
          // Reset the form after successful submission
          this.articleForm.reset();
          this.selectedFile = null;
          alert('Article uploaded successfully!');
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
  

  onFileSelected(event: any) {
    // Handle file selection
    this.selectedFile = event.target.files[0];
  }

}
