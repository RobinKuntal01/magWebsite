import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-magazine',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-magazine.component.html',
  styleUrls: [ './add-magazine.component.css']
})
export class AddMagazineComponent {
  magazineForm: FormGroup;
  PDF: File | null = null;
  Image: File | null = null;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.magazineForm = this.fb.group({
      title: [''],
      author: [''],
      industry: [''],
      magazinePDF:[''],
      coverImage: ['']
    });
  }
    onSubmit() {
      if (this.magazineForm.valid && this.PDF) {
    // Handle form submission
    const formData = new FormData();
    formData.append('title', this.magazineForm.value.title);
    console.log(this.magazineForm.value.title);
    
    formData.append('author', this.magazineForm.value.author);
    formData.append('industry', this.magazineForm.value.industry);    
    if (this.PDF) {
      console.log(this.magazineForm.value.magazinePDF);
      formData.append('magazinePDF', this.PDF, this.PDF.name);
    }
   
    
    if(this.Image){
      console.log(this.magazineForm.value.coverImage)
      formData.append('coverImage', this.Image, this.Image.name )
    }
    
    console.log(formData);
      // Send formData to your server using HttpClient
    this.http.post('https://api.digitalbusinessreview.com/api/v1/magazine/uploadMag', formData).subscribe(
    response => {
      console.log('Server response:', response);
      // Reset the form after successful submission
      
      this.PDF = null;
      this.Image = null;
    },
    error => {
      console.error('Error:', error);
    }
  );
      
  alert('Magazine uploaded successfully!');
  }
}
onFileSelected(event: any) {
  const selectedFile = event.target.files[0];
  if (event.target.id === 'inputGroupFile01') {
    this.PDF = selectedFile;
  } else if (event.target.id === 'inputGroupFile02') {
    this.Image = selectedFile;
  }
}


}
