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
    
    private UserFactoryAbi = [{"constant":false,"inputs":[],"name":"createOrganizer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getBasicUserAt","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getOrganizer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"createBasicUser","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_BSTokenFrontend","type":"address"},{"name":"_EventFactory","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identifier","type":"uint256"},{"indexed":false,"name":"_organizer","type":"address"}],"name":"OrganizerCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identifier","type":"uint256"},{"indexed":false,"name":"_user","type":"address"}],"name":"BasicUserCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
    private UserFactoryAddress = "0x5C35BE4C93A62185596f0582d2F5e884ED4e43bF";
    
    private EventFactoryAbi = [{"constant":true,"inputs":[],"name":"bsToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ticketTokenFactory","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getEventAt","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_organizer","type":"address"},{"name":"_percentage","type":"uint16"},{"name":"_id","type":"uint256"}],"name":"createEvent","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_ticketTokenFactory","type":"address"},{"name":"_bsTokenFrontend","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idEv","type":"uint256"},{"indexed":false,"name":"_event","type":"address"},{"indexed":false,"name":"_createdBy","type":"address"}],"name":"CreateEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
    private EventFactoryAddress = "0x212e8Ad219bAccd21d7f1e3b0aF8C21D155d7A91";

    private TicketTokenFactoryAbi = [{'constant':false,'inputs':[{'name':'_ticketType','type':'uint8'},{'name':'_price','type':'uint16'},{'name':'_quantity','type':'uint16'}],'name':'createTicketToken','outputs':[{'name':'','type':'address'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[{'name':'','type':'uint256'}],'name':'tickets','outputs':[{'name':'','type':'address'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'owner','outputs':[{'name':'','type':'address'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'newOwner','type':'address'}],'name':'transferOwnership','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'inputs':[],'payable':false,'stateMutability':'nonpayable','type':'constructor'},{'anonymous':false,'inputs':[{'indexed':false,'name':'identifier','type':'uint256'},{'indexed':false,'name':'_ticketToken','type':'address'},{'indexed':false,'name':'_event','type':'address'}],'name':'TicketCreated','type':'event'},{'anonymous':false,'inputs':[{'indexed':true,'name':'previousOwner','type':'address'},{'indexed':true,'name':'newOwner','type':'address'}],'name':'OwnershipTransferred','type':'event'}];
    private TicketTokenFactoryAddress = "0xdA9D9d41b4AFbE971340d9c1CCDe10BDcdad084d";

    private EventAbi = [{"constant":false,"inputs":[{"name":"_ticketType","type":"uint8"},{"name":"_price","type":"uint16"},{"name":"_quantity","type":"uint16"}],"name":"addTicket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_bsToken","type":"address"}],"name":"setBsToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint16"}],"name":"getOrganizerAt","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"accept","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_organizerAddress","type":"address"},{"name":"_percentage","type":"uint16"}],"name":"addOrganizer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"eventSuccess","type":"bool"}],"name":"evaluate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getStatus","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_factory","type":"address"}],"name":"setFactory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ticketType","type":"uint8"},{"name":"amount","type":"uint8"}],"name":"buyTickets","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_quantity","type":"uint16"},{"name":"ticketType","type":"uint8"}],"name":"refundAResell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint16"}],"name":"getTicket","outputs":[{"name":"ticketToken","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"resolveEvaluation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"redButton","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAmountTicketTypes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_date","type":"uint256"},{"name":"_duration","type":"uint256"}],"name":"initializeDate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"cancel","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"end","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"success","type":"bool"}],"name":"resolveFrozen","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"open","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_organizer","type":"address"},{"name":"_percentage","type":"uint16"},{"name":"_id","type":"uint256"},{"name":"_bsToken","type":"address"},{"name":"_ticketTokenFactory","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identifier","type":"uint256"},{"indexed":false,"name":"_newOrganizer","type":"address"},{"indexed":false,"name":"_addedBy","type":"address"}],"name":"OrganizerAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identifier","type":"uint256"},{"indexed":false,"name":"_organizer","type":"address"}],"name":"OrganizerAccepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identifier","type":"uint256"},{"indexed":false,"name":"_organizer","type":"address"}],"name":"OrganizerCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identifier","type":"uint256"},{"indexed":false,"name":"_newStatus","type":"uint256"},{"indexed":false,"name":"_oldStatus","type":"uint256"},{"indexed":false,"name":"_changedBy","type":"address"}],"name":"EventStatusChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identifier","type":"uint256"},{"indexed":false,"name":"_amount","type":"uint256"},{"indexed":false,"name":"_pressedBy","type":"address"}],"name":"RedButton","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
    
    private TicketTokenAbi = [{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"getClientAt","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getValue","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint16"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCap","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"data","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_number","type":"uint16"}],"name":"assignTickets","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getNumberClients","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint16"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getEvent","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalSupply","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_number","type":"uint16"}],"name":"useTicket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_sender","type":"address"}],"name":"redButton","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint16"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_event","type":"address"},{"name":"_cap","type":"uint16"},{"name":"_value","type":"uint16"},{"name":"_type","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"indentifier","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"_boughtBy","type":"address"}],"name":"TicketBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"indentifier","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"_boughtBy","type":"address"},{"indexed":false,"name":"_boughtFrom","type":"address"}],"name":"TicketResold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"indentifier","type":"uint256"},{"indexed":false,"name":"_usedBy","type":"address"}],"name":"TicketUsed","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
    
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
        //this.getBSTokenEvents();

    }

    public getUserFactoryEvents() {
        var that = this;
        var UserFactoryContract = new this.web3.eth.Contract(this.UserFactoryAbi);
        UserFactoryContract._address = this.UserFactoryAddress;

        this.getEventsFromContract(UserFactoryContract).subscribe(events => {
            console.log('User Factory', events);
            events = events.map(event => {
                switch(event.returnValues[0]) {
                    case "1": 
                        ++that.organizersCount;
                        this.events.push({
                            blockNumber: event.blockNumber,
                            text: `Nuevo organizador: ${event.returnValues._organizer.substring(0,10)}`
                        })
                        break;
                    case "2":
                        ++that.usersCount;
                        this.events.push({
                            blockNumber: event.blockNumber,
                            text: `Nuevo usuario: ${event.returnValues._user.substring(0,10)}`
                        })
                        break;
                    default:
                        this.events.push(event);
                }

            })
            this.orderEventsByBlock()
        });
    }

    public getEventFactoryEvents() {
        var that = this;
        var EventFactoryContract = new this.web3.eth.Contract(this.EventFactoryAbi);
        EventFactoryContract._address = this.EventFactoryAddress;

        this.getEventsFromContract(EventFactoryContract).subscribe(events => {
            console.log('Event Factory', events);
            events = events.map(event => {
                ++that.eventsCount;
                that.getEventsFromContract(event.returnValues._event);
                this.events.push({
                    blockNumber: event.blockNumber,
                    text: `Nuevo evento: ${event.returnValues._event.substring(0,10)} - Creado por: ${event.returnValues._createdBy.substring(0,10)}`
                })
            })
            this.orderEventsByBlock()
        });
    }

    public getTicketTokenFactoryEvents() {
        var that = this;
        var TicketTokenFactoryContract = new this.web3.eth.Contract(this.TicketTokenFactoryAbi);
        TicketTokenFactoryContract._address = this.TicketTokenFactoryAddress;

        this.getEventsFromContract(TicketTokenFactoryContract).subscribe(events => {
            console.log('TicketToken Factory', events);
            events = events.map(event => {
                that.getTicketTokenEvents(event.returnValues._ticketToken, event.returnValues._event);
                this.events.push({
                    blockNumber: event.blockNumber,
                    text: `Nuevo ticket para el evento ${event.returnValues._event.substring(0,10)}`
                })
            })

            this.orderEventsByBlock()
        });
    }

    public getEventEvents(address: string) {
        var EventContract = new this.web3.eth.Contract(this.EventAbi);
        EventContract._address = address;

        this.getEventsFromContract(EventContract).subscribe(events => {
            console.log('Events', events);
            events = events.map(event => {
                switch(event.returnValues[0]) {
                    case "1": 
                        this.events.push({
                            blockNumber: event.blockNumber,
                            text: `${event.returnValues._addedBy.substring(0,10)} ha añadido el organizador ${event.returnValues._newOrganizer.substring(0,10)} al evento ${address.substring(0,10)}`
                        })
                        break;
                    case "2":
                        this.events.push({
                            blockNumber: event.blockNumber,
                            text: `Se ha aceptado el organizador ${event.returnValues._organizer.substring(0,10)} en el evento ${address.substring(0,10)}`
                        })
                        break;
                    case "3":
                        this.events.push({
                            blockNumber: event.blockNumber,
                            text: `Se ha cancelado el organizador ${event.returnValues._organizer.substring(0,10)} en el evento ${address.substring(0,10)}`
                        })
                        break;
                    case "4":
                        this.events.push({
                            blockNumber: event.blockNumber,
                            text: `${event.returnValues._changedBy.substring(0,10)} ha cambiado el estado del evento ${address.substring(0,10)} de ${event.returnValues._oldStatus} a ${event.returnValues._newStatus}`
                        })
                        break;
                    case "5":
                        this.events.push({
                            blockNumber: event.blockNumber,
                            text: `Red button: ${event.returnValues._amount}`
                        })
                        break;
                    default:
                        this.events.push(event);
                }

            })
            this.orderEventsByBlock()
        });
    }

    public getTicketTokenEvents(address: string, currentEvent: string) {
        var TicketTokenContract = new this.web3.eth.Contract(this.TicketTokenAbi);
        TicketTokenContract._address = address;

        this.getEventsFromContract(TicketTokenContract).subscribe(events => {
            console.log('Ticket Token', events);
            events = events.map(event => {
                switch(event.returnValues[0]) {
                    case "1": 
                        this.events.push({
                            blockNumber: event.blockNumber,
                            text: `${event.returnValues._boughtBy.substring(0,10)} ha comprado ${event.returnValues.amount} tickets para el evento ${currentEvent.substring(0,10)}`
                        })
                        break;
                    case "2":
                        this.events.push({
                            blockNumber: event.blockNumber,
                            text: `${event.returnValues._boughtFrom.substring(0,10)} ha revendido ${event.returnValues.amount} tickets del evento ${currentEvent.substring(0,10)} a ${event.returnValues._boughtBy.substring(0,10)}`
                        })
                        break;
                    case "3":
                        this.events.push({
                            blockNumber: event.blockNumber,
                            text: `${event.returnValues._usedBy.substring(0,10)} ha usado un ticket del evento ${currentEvent.substring(0,10)}`
                        })
                        break;
                    default:
                        this.events.push(event);
                }

            })
            this.orderEventsByBlock()
        });
    }

    public getBSTokenEvents() {
        var BSTokenContract = new this.web3.eth.Contract(this.BSTokenAbi);
        BSTokenContract._address = this.BSTokenAddress;

        this.getEventsFromContract(BSTokenContract).subscribe(events => {

        });
        this.orderEventsByBlock()
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
                        blockNumber: event.blockNumber,
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
                    blockNumber: event.blockNumber,
                    returnValues: event.returnValues
                }])
            })
            .on('error', console.error);
        });
    }

    private orderEventsByBlock() {
        this.events.sort((a,b) => a.blockNumber - b.blockNumber);
    }
}
