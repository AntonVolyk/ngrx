import { LoadUserThreadsAction } from './../store/actions';
import { ThreadSummaryVM } from './thread-summary.vm';
import { ApplicationState } from './../store/application-state';
import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Store } from '@ngrx/store';
import { UserThreadsLoadedAction } from '../store/actions';
import 'rxjs/add/operator/skip';
import { Observable} from 'rxjs';
import { Thread } from '../../../shared/model/thread';
import * as _ from 'lodash';
import { userNameSelector } from './userNameSelector';
import { mapStateToUnreadMessagesCounter } from './mapStateToUnreadMessagesCounter';
import { stateToThreadSummariesSelector } from './stateToThreadSummariesSelector';
import { AppState } from '../store/store-data';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private store: Store<AppState>) {
    store.subscribe(state => console.log('thread section recieved state', state));
    this.userName$ = store.select(userNameSelector);
    this.unreadMessagesCounter$ = store.select(mapStateToUnreadMessagesCounter);
    this.threadSummaries$ = store.select(stateToThreadSummariesSelector);
  }

  ngOnInit() {
    this.store.dispatch(new LoadUserThreadsAction());
  }
}
