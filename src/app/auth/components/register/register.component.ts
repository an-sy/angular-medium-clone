import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { registerAction, stepAction } from "../../store/action";

@Component({
  selector: "mc-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store){}
  ngOnInit(): void {
    this.initializeForm()
  }
   initializeForm(): void {
    console.log("initializeForm");
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit(): void {
    console.log("submit", this.form.value, this.form.valid)
    this.store.dispatch(registerAction(this.form.value))
  }
  onChange(bla): void {
    if(bla) {
      this.store.dispatch(stepAction(this.form.value))
    }
  }
}
 