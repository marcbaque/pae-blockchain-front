import { DOCUMENT } from '@angular/platform-browser';
import { SidebarService } from '../core/sidebar/sidebar.service';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    Inject
} from '@angular/core';
import { Action } from 'ngx-canaima';
var Web3 = require('web3');
var moment = require('moment');
import { Router } from '@angular/router';
import { RelativeTimeFilterPipe } from 'app/events/date.pipe';
import { Observable } from 'rxjs/Observable';

@Component({

    templateUrl: 'events.component.html',
    styleUrls: [
        './events.component.scss',
    ]
})
export class EventsComponent implements OnInit {
    public events = [];

    public web3;

    public eventsCount = 0;
    public usersCount = 0;
    public organizersCount = 0;

    private UserFactoryAbi = "";
    private UserFactoryAddress = "";

    private EventFactoryAbi = "";
    private EventFactoryAddress = "";

    private TicketTokenFactoryAbi = "";
    private TicketTokenFactoryAddress = "";

    private EventAbi = "";

    private TicketTokenAbi = "";

    private BSTokenAbi = "";
    private BSTokenAddress = "";

    constructor(
      @Inject(DOCUMENT) private document: any,
      public sidebarService: SidebarService,
      public router: Router
    ) { }

    public ngOnInit() {
        if (this.web3 !== undefined) {
            this.web3 = new Web3(this.web3.currentProvider);
        } else {
            this.web3 = new Web3(new Web3.providers.WebsocketProvider('ws://bsnode1.westeurope.cloudapp.azure.com'));
        }
        
        this.getEvents();
    }

    public getEvents() {
        // Get some events
        //
        this.getUserFactoryEvents();
        this.getEventFactoryEvents();
        this.getTicketTokenFactoryEvents();
        this.getBSTokenEvents();

    }

    public getUserFactoryEvents() {
        var that = this;
        var UserFactoryContract = new this.web3.eth.Contract(this.UserFactoryAbi);
        UserFactoryContract._address = this.UserFactoryAddress;

        this.getEventsFromContract(UserFactoryContract).subscribe(events => {
            events = events.map(event => {
                switch(event.id) {
                    case 1: 
                        ++that.organizersCount;
                        return {
                            text: `Nuevo organizador: ${event.returnValues._organizer}`
                        }
                    case 2:
                        ++that.usersCount;
                        return {
                            text: `Nuevo usuario: ${event.returnValues._user}`
                        }
                    default:
                        return event;
                }

            })

            this.events.push.apply(events);
        });
    }

    public getEventFactoryEvents() {
        var that = this;
        var EventFactoryContract = new this.web3.eth.Contract(this.EventFactoryAbi);
        EventFactoryContract._address = this.EventFactoryAddress;

        this.getEventsFromContract(EventFactoryContract).subscribe(events => {
            events = events.map(event => {
                that.eventsCount;
                that.getEventsFromContract(event.returnValues._event);
                return {
                    text: `Nuevo evento: ${event.returnValues._event} - Creado por: ${event.returnValues._createdBy}`
                }
            })

            this.events.push.apply(events);
        });
    }

    public getTicketTokenFactoryEvents() {
        var that = this;
        var TicketTokenFactoryContract = new this.web3.eth.Contract(this.TicketTokenFactoryAbi);
        TicketTokenFactoryContract._address = this.TicketTokenFactoryAddress;

        this.getEventsFromContract(TicketTokenFactoryContract).subscribe(events => {
            events = events.map(event => {
                that.getTicketTokenEvents(event.returnValues._ticketToken, event.returnValues._event);
                return {
                    text: `Nuevo ticket para el evento ${event.returnValues._event}`
                }
            })

            this.events.push.apply(events);
        });
    }

    public getEventEvents(address: string) {
        var EventContract = new this.web3.eth.Contract(this.EventAbi);
        EventContract._address = address;

        this.getEventsFromContract(EventContract).subscribe(events => {
            events = events.map(event => {
                switch(event.id) {
                    case 1: 
                        return {
                            text: `${event.returnValues._addedBy} ha añadido el organizador ${event.returnValues._newOrganizer} al evento ${address}`
                        }
                    case 2:
                        return {
                            text: `Se ha aceptado el organizador ${event.returnValues._organizer} en el evento ${address}`
                        }
                    case 3:
                        return {
                            text: `Se ha cancelado el organizador ${event.returnValues._organizer} en el evento ${address}`
                        }
                    case 4:
                        return {
                            text: `${event.returnValues._changedBy} ha cambiado el estado del evento ${address} de ${event.returnValues._oldStatus} a ${event.returnValues._newStatus}`
                        }
                    case 5:
                        return {
                            text: `Red button: ${event.returnValues._amount}`
                        }
                    default:
                        return event;
                }

            })

            this.events.push.apply(events);
        });
    }

    public getTicketTokenEvents(address: string, currentEvent: string) {
        var TicketTokenContract = new this.web3.eth.Contract(this.TicketTokenAbi);
        TicketTokenContract._address = address;

        this.getEventsFromContract(TicketTokenContract).subscribe(events => {
            events = events.map(event => {
                switch(event.id) {
                    case 1: 
                        return {
                            text: `${event.returnValues._boughtBy} ha comprado ${event.returnValues.amount} tickets para el evento ${currentEvent}`
                        }
                    case 2:
                        return {
                            text: `${event.returnValues._boughtFrom} ha revendido ${event.returnValues.amount} tickets del evento ${currentEvent} a ${event.returnValues._boughtBy}`
                        }
                    case 3:
                        return {
                            text: `${event.returnValues._usedBy} ha usado un ticket del evento ${currentEvent}`
                        }
                    default:
                        return event;
                }

            })

            this.events.push.apply(events);
        });
    }

    public getBSTokenEvents() {
        var BSTokenContract = new this.web3.eth.Contract(this.BSTokenAbi);
        BSTokenContract._address = this.BSTokenAddress;

        this.getEventsFromContract(BSTokenContract).subscribe(events => {

        });
    }

    private getEventsFromContract(contract) {
        var that = this;
        return new Observable<any[]>(observer => {
            contract.getPastEvents('allEvents', {
                fromBlock: 0,
                toBlock: 'latest'
            },(err, result) => console.log(err,result)).then(function(events) {
                events = events.map(function(event){
                    return {
                        id: event.returnValues.identifier,
                        returnValues: event.returnValues
                    }
                })
                observer.next(events)
            });
    
            contract.events.allEvents({
                fromBlock: 0,
                toBlock: 'latest'
            },(err, result) => console.log(err,result))
            .on('data', function(event){
                observer.next([{
                    id: event.returnValues.identifier,
                    returnValues: event.returnValues
                }])
            })
            .on('error', console.error);
        });
    }
}
