import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { IAddress } from 'src/app/shared/models/address';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkOutForm: FormGroup;

  constructor(private accountService: AccountService, private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  saveUserAddress() {
    this.accountService.updateUserAddress(this.checkOutForm.get('addressForm').value)
      .subscribe((address: IAddress) => {
        this.toastrService.success('Address saved');
        //set the address form to pristine state so after the address update the button will be disabed therefore avoiding unwanted calls to server.
        this.checkOutForm.get('addressForm').reset(address);
    }, error => {
        this.toastrService.error(error.message);
        console.log(error);
    });
  }

}
