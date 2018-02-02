import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DeviceMotion } from '@ionic-native/device-motion';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public localNotifications: LocalNotifications, public alertCtrl: AlertController, public deviceMotion: DeviceMotion) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmPage');
  }


  //Setando o alarme

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

   //Alerta Alarme ativo


    let alert = this.alertCtrl.create({
      title: 'Alarme ativado!',
      buttons: ['OK']
    });
    alert.present();

   //Disparar alarme

   this.localNotifications.on('trigger', () =>{
      
    this.alarmHandler();  
    
   });


  }
  stopAlarm() {
    this.sound.pause();
  }
  alarmHandler() {
    this.sound.play(); 
  }
  

}

