import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getToken, getUser } from '../auth/store/auth.selector';
import { of, switchMap, take } from 'rxjs';
import {
  ClientDetailsHistory,
  GenderType,
  GymDetails,
  ProfessionalDetails,
  ClientGalleryPicture,
  UserType,
  ClientDetails,
  CollectionsType,
} from './model/profile-interface';
import { Client } from './model/client.model';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private firestore: AngularFirestore
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
    return this.firestore.collection(CollectionsType.clients).add(client);
  }
}
