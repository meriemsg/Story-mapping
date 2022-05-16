import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GeneraldataService} from '../../services/generaldata.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  arrayDataStatus = [] as any;
  selectedStatus = [] as any
  arrayDataColors = [] as any;

  @Output('selected_status') selected_status = new EventEmitter<any>();


  constructor(private dataService: GeneraldataService) {
  }

  ngOnInit(): void {
    this.getAllStatus();
    this.getAllColors();
  }

  getAllStatus() {
    this.dataService.getStatus().subscribe((res) => {
      this.arrayDataStatus = res.issue_statuses.map((el: any) => {
        const o = Object.assign({isChecked: true}, el);
        return o;
      });


      this.arrayDataStatus = res.issue_statuses.map((el: any) => {
        const o = Object.assign({isChecked: true}, el);
        return o;
      });
      this.getselectedStatus();
    });

  }

  getselectedStatus() {
    this.selectedStatus = this.arrayDataStatus.filter((el: any) => {
      return el.isChecked;
    });
    this.selected_status.emit(this.selectedStatus);
  }

  getAllColors() {
    this.arrayDataColors = this.dataService.getx();
  }


}
