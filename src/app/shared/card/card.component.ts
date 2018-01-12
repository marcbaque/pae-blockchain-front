import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toolbar, Nav } from 'ngx-canaima';
import { ToolbarMenuService } from 'ngx-canaima';
import { Input } from '@angular/core';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'card',
    templateUrl: 'card.component.html',
    styleUrls: [
      './card.component.scss'
    ]
})
export class CardComponent implements OnInit {
    @Input() public title: string;
    @Input() public description: string;
    @Input() public centered: boolean = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    public ngOnInit() {
        console.log(this.title, this.description)
    }

}
