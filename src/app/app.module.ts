import { LoadThreadsEffectService } from './store/effects/load-threads-effect.service';
import { UserThreadsLoadedAction, USER_THREADS_LOADED_ACTION } from './store/actions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ThreadsService } from './services/threads.service';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { INITIAL_APPLICATION_STATE, ApplicationState } from './store/application-state';
import { Action } from 'rxjs/scheduler/Action';
import { AllUserData } from '../../shared/to/all-user-data';
import * as _ from 'lodash';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export function storeReducer(
  state: ApplicationState = INITIAL_APPLICATION_STATE,
  action: UserThreadsLoadedAction
): ApplicationState {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state, action);
    default:
      return state;
  }
}

function handleLoadUserThreadsAction(state: ApplicationState, action: UserThreadsLoadedAction): ApplicationState {
  const userData = action.payload;
  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData = {
    participants: _.keyBy(action.payload.participants, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  };

  return newState;
}

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.forRoot({appState: storeReducer}),
    EffectsModule.forRoot([LoadThreadsEffectService]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
