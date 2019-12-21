import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Role, User} from './_models';
import {Router, RouterOutlet} from '@angular/router';
import {AuthenticationService} from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() outlet: RouterOutlet;
  title = 'app-cliente';
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  onActivate(component) {
    if (this.router.url !== '/login') {
      component.currentUser = this.currentUser;
    }
  }
}
