import { Injectable } from '@angular/core';
import { BaseHttpService } from '@/app/auth/services/base-http.service';
import { map } from 'rxjs';
import { UserAuth } from '@/app/auth/model/userAuth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthNextJsService extends BaseHttpService {
  login(email: string, password: string) {
    const result = this.post(
      `api/v1/auth/email/login`,
      {
        email: email,
        password: password,
      },
      {
        responseType: 'text',
        withCredentials: true,
      },
      UserAuth
    );

    result.pipe(
      map((result: any) => {
        console.log('result', result);
      })
    );

    return result;
  }
}
