import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class AuthorsComponent {
  authorId!: number;
  author: any;
  errorMessage: string = '';
  private apiUrl = 'http://localhost:8080/books-api/authors';

  constructor(private http: HttpClient) {}

  fetchAuthor(): void {
    this.getAuthorById(this.authorId).subscribe({
      next: (data) => {
        this.author = data;
        this.errorMessage = '';
      },
      error: () => {
        this.author = undefined;
        this.errorMessage = 'Author not found.';
      },
    });
  }

  getAuthorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}



