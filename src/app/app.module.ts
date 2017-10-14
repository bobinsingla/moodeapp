import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } 	 from '@angular/http';
import { RouterModule }  from '@angular/router';
import { MasonryModule } from 'angular2-masonry';

import { AppComponent }  from './app.component';
import { LoginComponent } from './login.component';
import { HeaderComponent } from './header.component';
import { MoodBarComponent } from './mood-bar.component';
import { HomePostComponent } from './home-post.component';
import { ShopComponent} from './shop.component';
import { WorldComponent } from './world.component';
import { WorldDetailComponent } from './world-detail.component';
import { PostDetailComponent } from './post-detail.component';

@NgModule({
  imports:      [
    MasonryModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomePostComponent
      },
      {
        path: 'story/:id',
        component: PostDetailComponent
      },
    ]),
    RouterModule.forChild([
      {
        path: 'shop',
        component: ShopComponent
      },
      {
        path: 'world',
        component: WorldComponent
      },
      {
        path: 'world/:id',
        component: WorldDetailComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MoodBarComponent,
    HomePostComponent,
    PostDetailComponent,
    ShopComponent,
    WorldComponent,
    WorldDetailComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
