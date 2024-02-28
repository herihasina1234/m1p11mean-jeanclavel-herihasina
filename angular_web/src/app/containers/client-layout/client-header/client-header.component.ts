import { Component, Input } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.scss'
})
export class ClientHeaderComponent extends HeaderComponent{

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService) {
    super();
  }
}
