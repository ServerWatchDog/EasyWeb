import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardDrawerService {
  drawer = false;

  constructor() {
  }

  toggle() {
    this.drawer = !this.drawer
  }

}
