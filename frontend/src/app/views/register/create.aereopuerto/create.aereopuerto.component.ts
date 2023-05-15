import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aereopuerto } from 'src/app/models/aereopuerto';
import { AereopuertoService } from 'src/app/services/aereopuerto.service';

@Component({
  selector: 'app-create.aereopuerto',
  templateUrl: './create.aereopuerto.component.html',
  styleUrls: ['./create.aereopuerto.component.scss']
})
export class CreateAereopuertoComponent {
  title: string = 'Registrar';
  id: number = 0;
  airportForm!: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private aerepuertoService: AereopuertoService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.airportForm = new FormGroup({
      airport_name: new FormControl('', Validators.required),
      airport_location: new FormControl('', Validators.required),
      other_details: new FormControl('', Validators.required)
    });
    if (this.id != 0) {
      this.title = 'Editar';
      this.aerepuertoService.getAirportById(this.id).subscribe((data: any) => {
        this.airportForm.get('airport_name')?.setValue(data.airport_name);
        this.airportForm.get('airport_location')?.setValue(data.airport_location);
        this.airportForm.get('other_details')?.setValue(data.other_details);
      });
    }
  }

  public createAirport() {
    if (this.airportForm.valid) {
      var body = new Aereopuerto();
      var updateBody = new Aereopuerto();
      body.airport_name = this.airportForm.get('airport_name')?.value;
      body.airport_location = this.airportForm.get('airport_location')?.value;
      body.other_details = this.airportForm.get('other_details')?.value;
      if (this.id != 0) {
        updateBody.airport_name = this.airportForm.get('airport_name')?.value;
        updateBody.airport_location = this.airportForm.get('airport_location')?.value;
        updateBody.other_details = this.airportForm.get('other_details')?.value;
        this.aerepuertoService.updateAirport(this.id, updateBody).subscribe((data: any) => { this.redirectTo('dashboard/supervisor/aereopuertos'); });
      } else {
        this.aerepuertoService.createAirport(body).subscribe((data: any) => { this.redirectTo('dashboard/supervisor/aereopuertos'); });
      }
    }
  }
  public redirectTo(uri: string) {
    this.router.navigate([uri]);
  }
}
