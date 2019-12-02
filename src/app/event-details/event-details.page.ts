import { UiserviceService } from './../services/uiservice.service';
import { AuthConstants } from './../config/auth-constants';
import { DataServiceService } from './../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event: any;
  participates=[];
  constructor(private activatedRoute: ActivatedRoute, public dataservice: DataServiceService, public Ui: UiserviceService) {
    this.event = {
      image: "https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png"
    }
  }
  Addfriend(otherUserId) {
    var JsonData = {
      FriendUserID: otherUserId,
      UserID: AuthConstants.authenticateData['id']
    }

    this.dataservice.addFriend(JsonData).then(res => {
      console.log(res);
      this.Ui.showAlert("Added as Friend");
    }, err => {
      console.log(err);
      this.Ui.showAlert("Something went wrong", 0);

    })
  }
  joinEvent(status) {
    var jsonData = {

      UserID: AuthConstants.authenticateData['id'],
      EventID: this.event.EventID,
      Status: status

    }
    this.dataservice.joinEvent(jsonData).then(res => {
      console.log(res);
      if (typeof res.data === "string") {
        res.data = JSON.parse(res.data);
      }
      this.Ui.showAlert(res.data.data.message);
    }, err => {
      console.log(err);
    })
  }
  ngOnInit() {
    let eventid = this.activatedRoute.snapshot.paramMap.get('id');
    eventid
    this.dataservice.getEventDetails(eventid).then(res => {
      console.log(res);
      if (typeof res.data === "string") {
        res.data = JSON.parse(res.data);
        console.log("eventData", res.data);
      }

      this.event = res.data.data;
    }, err => {
      console.log(err);
    });
    this.dataservice.getEventsUsers(eventid).then(res => {
      if (typeof res.data === "string") {
        res.data = JSON.parse(res.data);
        console.log("data", res.data);
      }
      if (res.data.data.length > 0) {
        this.participates = res.data.data;
      }
    }, err => {
      console.log(err);
    })
  }

}
