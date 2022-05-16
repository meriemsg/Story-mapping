import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {ProjectsComponent} from './components/project/projects.component';
import {SearchComponent} from './components/search/search.component';
import {AppRoutingModule} from "../app-routing.module";
import {VersionComponent} from './components/version/version.component';
import {FeatureComponent} from './components/feature/feature.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {CategorieComponent} from './components/categorie/categorie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TargetversionComponent} from './components/targetversion/targetversion.component';
import {NgSelect2Module} from 'ng-select2';
import {TrackersComponent} from './components/trackers/trackers.component';
import {StatusComponent} from './components/status/status.component';
import {TranslateModule} from '@ngx-translate/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PriorityComponent} from './components/priority/priority.component';
import {AssignneComponent} from './components/assignne/assignne.component';
import {OptionsComponent} from './components/options/options.component';




@NgModule({

  declarations: [MainMenuComponent,

    ProjectsComponent,
    SearchComponent,
    VersionComponent,
    FeatureComponent,
    DropdownComponent,
    TargetversionComponent,
    CategorieComponent,
    TrackersComponent,
    StatusComponent,
    PriorityComponent,
    AssignneComponent,
    OptionsComponent],

  exports: [
    ProjectsComponent,
    MainMenuComponent,
    SearchComponent,
    FeatureComponent,
    VersionComponent,
    StatusComponent,
    TrackersComponent,
    DropdownComponent,
    TargetversionComponent,
    CategorieComponent,
    PriorityComponent,
    AssignneComponent,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    TranslateModule.forRoot(),
    DragDropModule
  ]
})
export class ReusablesModule {

}
