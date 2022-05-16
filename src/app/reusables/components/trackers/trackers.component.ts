import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GeneraldataService} from '../../services/generaldata.service';

@Component({
  selector: 'app-trackers',
  templateUrl: './trackers.component.html',
  styleUrls: ['./trackers.component.css']
})
export class TrackersComponent implements OnInit {
  arrayDataTrackers = [] as any;
  selectedTrackers = [] as any;

  @Output('selected_trackers') selected_trackers = new EventEmitter<any>()


  constructor(private dataService: GeneraldataService) {
  }

  ngOnInit(): void {
    this.getAllTrackers();
  }

  getSelectedTrackers() {
    this.selectedTrackers = this.arrayDataTrackers.filter((el: any) => {

      return el.isChecked
    })
    this.selected_trackers.emit(this.selectedTrackers)

  }

  getAllTrackers() {
    this.dataService.getTrackers().subscribe((res) => {
      this.arrayDataTrackers = res.trackers.map((el: any) => {
        const obj = Object.assign({isChecked: true}, el);
        return obj;
      });
      this.getSelectedTrackers();
    });
  }

}
