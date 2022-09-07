import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { loginAction } from "../../store/actions/login.action";
import { isSubmittingSelector, validationErrorsSelector } from "../../store/selectors";
import { BackendErrorsInterface } from "../../types/backendErrors.interface";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";

@Component({
  selector: "mc-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
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
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit(): void {
      const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request}))
  }
}
 