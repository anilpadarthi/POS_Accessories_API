import { Component, OnInit } from '@angular/core';
import {FormControl, 
  FormGroup,
  FormBuilder,
  FormArray,
  Validators} from '@angular/forms';

@Component({
  selector: 'app-accountability',
  templateUrl: './accountability.component.html',
  styleUrls: ['./accountability.component.scss']
})
export class AccountabilityComponent implements OnInit {

  buyTicketForm: FormGroup;
  constructor(private fb: FormBuilder) {
  }

  createTicket():FormGroup{

    return this.fb.group({
      name:[null,Validators.required],
      age:[null,Validators.required]
    })
  }

  ngOnInit() {
    this.buyTicketForm = this.fb.group(
      {
        emailControl: [null, [Validators.required]],
        phoneControl: [null],
        address:this.fb.group({
          streetControl : [],
          postalcodeControl: []
        }),
        tickets:this.fb.array([this.createTicket()],Validators.required)
      }
    )
  }
  get tickets():FormArray{
    return <FormArray> this.buyTicketForm.get('tickets');
  }
  
  addTicket() {
    this.tickets.push(this.createTicket());
  }

  buyTickets() {

    if(this.buyTicketForm.status == 'VALID'){
      console.log(this.buyTicketForm.value);
    }
  }
}
