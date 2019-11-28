import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiserviceService {

  loading;
  isLoading = false;
  constructor(public loadingController: LoadingController, public alertCtrl: AlertController) { }
  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
  async showAlert(body, title = 1) {
    const alert = await this.alertCtrl.create({
      header: title == 1 ? 'Success' : 'error',
      message: body,
      buttons: ['OK']
    });

    await alert.present();
  }
}
