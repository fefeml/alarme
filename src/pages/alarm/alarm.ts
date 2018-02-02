import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';


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
  sound = new Audio('assets/railroad_crossing_bell.mp3');
  agitar:boolean;
  andar:boolean;
  escrever:boolean;
  palavras = ['Paralelepípedo', 'Axioma', 'Brônquios', 'Tuberculose', 'Ecoturismo'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public localNotifications: LocalNotifications, public alertCtrl: AlertController, public deviceMotion: DeviceMotion) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmPage');
  }

  


  //Setando o alarme

  setAlarm() {

    let andarAlarm = this.andar;
    let escreverAlarm = this.escrever;
    let agitarAlarm = this.agitar;
  
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
    
   });  

   //Alerta Alarme ativo
   

    let alert = this.alertCtrl.create({
      title: 'Alarme ativado!',
      buttons: ['OK']
    });
    alert.present();

   //Disparar alarme

   this.localNotifications.on('trigger', () =>{
      
    this.alarmHandler(agitarAlarm, andarAlarm, escreverAlarm);
    
   });


  }
  stopAlarm() {
    this.sound.pause();

  }
  alarmHandler(agitar, andar, escrever) {
    this.sound.play();
    let index = Math.floor(Math.random() * 4);
    let palavra = this.palavras[index];


    if (this.agitar) {
      let subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
        if (acceleration.x >=Math.abs(8) || acceleration.y >=Math.abs(8) || acceleration.z >=Math.abs(8)){
          this.stopAlarm();
        }
    });
    } else if (this.andar) {
      //funcao com o plugin pedometer
    } else if (this.escrever) {
      let prompt = this.alertCtrl.create({
        title: 'Para acordar voce precisa:',
        message: `Escreva ${palavra}`,
        inputs: [
          {
            name: 'title',
            placeholder: 'Escreva aqui'
          },
        ],
        buttons: [
          
          {
            text: 'Enviar',
            handler: data => {
              

              if (data.title === palavra) {
                this.stopAlarm();
              } else {

              }
            }
          }
        ]
      });
      prompt.present();
    }
    }
    
    




}