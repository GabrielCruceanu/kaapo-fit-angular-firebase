import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CollectionsType,
  UserImage,
} from '@/app/profile/model/profile-interface';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import {
  setUserCoverImage,
  setUserProfileImage,
} from '@/app/profile/store/profile.actions';
import { setLoadingSpinner } from '@/app/store/shared/shared.actions';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { MatDialog } from '@angular/material/dialog';
import { TypeOfUploadImage } from '@/app/shared/model/upload-image-interface';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  private _percentageSource = new BehaviorSubject<number>(0);
  private percentage$ = this._percentageSource.asObservable();
  private imageForDb: UserImage;

  constructor(
    private storage: AngularFireStorage,
    private firestore: Firestore,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {}

  public startUpload(
    image: Blob,
    id: string,
    imageName: string,
    typeOfImage: TypeOfUploadImage,
    folder: CollectionsType
  ) {
    const storage = getStorage();
    // The storage path

    const path = `${id}/${imageName}`;

    // Reference to storage bucket
    // const ref = this.storage.ref(path);
    const storageRef = ref(storage, path);

    // The main task
    // const task = this.storage.upload(path, image);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

        this.dialog.closeAll();
        this.store.dispatch(setLoadingSpinner({ status: true }));

        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        this._percentageSource.next(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.warn('error', error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const refDb = doc(this.firestore, folder, id);

          this.imageForDb = {
            downloadURL: downloadURL,
            path,
          };

          switch (typeOfImage) {
            case TypeOfUploadImage.Profile: {
              updateDoc(refDb, {
                profileImage: {
                  downloadURL: downloadURL,
                  path,
                },
              });

              this.store.dispatch(
                setUserProfileImage({ profileImage: this.imageForDb })
              );
              break;
            }
            case TypeOfUploadImage.Cover: {
              updateDoc(refDb, {
                coverImage: {
                  downloadURL: downloadURL,
                  path,
                },
              });

              this.store.dispatch(
                setUserCoverImage({ coverImage: this.imageForDb })
              );
              break;
            }
          }
          this.store.dispatch(setLoadingSpinner({ status: false }));
        });
      }
    );
  }

  public getUploadPercentage(): Observable<number> {
    return this.percentage$;
  }
}
