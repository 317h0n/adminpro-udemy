import { NgModule } from '@angular/core';

// modulos
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// servicios
import { SidebarService } from '../services/service.index';

// componentes
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent
    ],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent
    ],
    providers: [
        SidebarService
    ],
})

export class SharedModule {}

