import { FCM } from '@ionic-native/fcm';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private fcm: FCM) {
    platform.ready().then(() => {
      //Notifications
      fcm.subscribeToTopic('all');
      fcm.getToken().then(token=>{
          console.log(token);
      })
      fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      })
      fcm.onTokenRefresh().subscribe(token=>{
        console.log(token);
      });
      //end notifications.
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

