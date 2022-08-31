import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { registerAction, stepAction } from "../../store/actions/register.action";
import { isSubmittingSelector, validationErrorsSelector } from "../../store/selectors";
import { BackendErrorsInterface } from "../../types/backendErrors.interface";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";

@Component({
  selector: "mc-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface> | null

  constructor(private fb: FormBuilder, private store: Store){}
  ngOnInit(): void {
    this.initializeForm()
    this.initialzeValues()
  }
  initialzeValues(): void {
      this.isSubmitting$= this.store.pipe(select(isSubmittingSelector))
      this.backendErrors$= this.store.pipe(select(validationErrorsSelector))
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
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))
  }
  onChange(bla): void {
    if(bla) {
      this.store.dispatch(stepAction(this.form.value))
    }
  }
}
 