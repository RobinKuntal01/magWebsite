import { Component, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navbarfixed:boolean = false;
  activeTab: string = ''; // Variable to store active tab
  isMenuOpen: boolean = false;
   constructor(private authService: AuthService) {
    this.authService.activeTabSubject.subscribe(tab => {
      this.activeTab = tab;
    });
  }

  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 100)
    {
      this.navbarfixed = true;
    }
    else
    {
      this.navbarfixed = false;
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  setActive(tab: string) {
    this.activeTab = tab;
    this.authService.setActiveTab(tab);    
  }
}
