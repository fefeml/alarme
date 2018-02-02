import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
<<<<<<< HEAD
=======
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
>>>>>>> deb1313fdbb0b1ff41e750d8923db96345609abf

/**
 * Generated class for the AlarmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html',
})
export class AlarmPage {

  myDate;
  Pular;
  Andar;
  Girar;
  sound = new Audio('assets/railroad_crossing_bell.mp3');

  constructor(public navCtrl: NavController, public navParams: NavParams, public localNotifications: LocalNotifications) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmPage');
  }

  setAlarm() {
  
    let dia = new Date().getDate();
    let mes = new Date().getMonth();
    mes++;
    let ano = new Date().getFullYear();

    let alarmTime = new Date(`${ano}-0${mes}-0${dia}T${this.myDate}:00`);

    let atual = new Date().getTime();

    let dif = <any>alarmTime - atual;

    if (dif < 0 ) {
      dia++;
      alarmTime = new Date(`${ano}-0${mes}-0${dia}T${this.myDate}:00`);
    }



    this.localNotifications.schedule({
      id: 1,
      title: 'Alarm',
      text: 'Hora de acordar',
      at: new Date(new Date().getTime() + dif),
      led: 'FF0000',
      icon: 'assets/fundo-noite.jpg',
    
   });  

   this.localNotifications.on('trigger', () =>{
      
    this.alarmHandler();  
    
   });


  }
  stopAlarm() {
    this.sound.pause();
    console.log("ACABOOOOOOOUUUUUUU.. EEE TETRAAAAAA")
  }
  alarmHandler() {
<<<<<<< HEAD
    this.sound.play(); 


  }
  

=======
    this.sound.play();
    let subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      if (acceleration.x >=Math.abs(8) || acceleration.y >=Math.abs(8) || acceleration.z >=Math.abs(8)){
        this.stopAlarm()
      }
  });
>>>>>>> deb1313fdbb0b1ff41e750d8923db96345609abf
}



}