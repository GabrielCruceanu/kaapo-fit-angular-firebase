import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getToken } from '../../auth/store/auth.selector';
import { switchMap, take } from 'rxjs';
import { ClientDetails, CollectionsType } from '../model/profile-interface';
import { Firestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private firestore: Firestore
  ) {}

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.store.select(getToken).pipe(
      take(1),
      switchMap((token) => {
        return this.http.post<{ imageUrl: string; imagePath: string }>(
          '',
          uploadData,
          { headers: { Authorization: 'Bearer ' + token } }
        );
      })
    );
  }

  public addClient(client: ClientDetails) {
    console.log('client', client);
    // return this.firestore.collection(CollectionsType.clients).add(client);
  }
}
