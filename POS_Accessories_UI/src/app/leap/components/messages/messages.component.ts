import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MessagesService } from './messages.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Observable, Subscription, map, mergeMap, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessagesService]
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public selectedTab: number = 1;
  public messages: Array<Object>;
  public files: Array<Object>;
  public meetings: Array<Object>;

  timerSubscription: Subscription;
  notificationsCount: number;
  timer: number = 2 * 60 * 1000; //2 Minutes

  constructor(private messagesService: MessagesService,
    private orderService: OrderService) {
    this.messages = messagesService.getMessages();
    this.files = messagesService.getFiles();
    this.meetings = messagesService.getMeetings();
  }

  ngOnInit() {
    this.triggerNotifications();
  }

  openMessagesMenu() {
    this.trigger.openMenu();
    this.selectedTab = 0;
  }

  onMouseLeave() {
    this.trigger.closeMenu();
  }

  stopClickPropagate(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  triggerNotifications() {
    this.timerSubscription = timer(0, this.timer).pipe(
      switchMap(() => this.orderService.getOrderNotificationCount())
    ).subscribe(result => {
      console.log(result);
      this.notificationsCount = result?.data ?? 0;
    });
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

}
