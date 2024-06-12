import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-magazine',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-magazine.component.html',
  styleUrls: ['./add-magazine.component.css']
})
export class AddMagazineComponent {
  magazineForm: FormGroup;
  PDF: File | null = null;
  Image: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.magazineForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      industry: ['', Validators.required],
      magazinePDF: ['', Validators.required],
      coverImage: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.magazineForm.valid && this.PDF) {
      const formData = new FormData();
      formData.append('title', this.magazineForm.value.title);
      formData.append('author', this.magazineForm.value.author);
      formData.append('industry', this.magazineForm.value.industry);
      if (this.PDF) {
        formData.append('magazinePDF', this.PDF, this.PDF.name);
      }
      if (this.Image) {
        formData.append('coverImage', this.Image, this.Image.name);
      }

      this.http.post('https://api.digitalbusinessreview.com/api/v1/magazine/uploadMag', formData).subscribe(
        response => {
          console.log('Server response:', response);
          alert('Magazine uploaded successfully!');
          this.PDF = null;
          this.Image = null;
          this.magazineForm.reset();
        },
        error => {
          console.error('Error:', error);
          alert('There is an Error');
        }
      );
    } else {
      this.magazineForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (event.target.id === 'inputGroupFile01') {
      this.PDF = selectedFile;
      this.magazineForm.patchValue({ magazinePDF: selectedFile });
    } else if (event.target.id === 'inputGroupFile02') {
      this.Image = selectedFile;
      this.magazineForm.patchValue({ coverImage: selectedFile });
    }
  }
}
