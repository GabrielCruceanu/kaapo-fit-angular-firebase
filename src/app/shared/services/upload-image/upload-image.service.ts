import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  CollectionsType,
  UserImage,
  UserImageType,
} from '@/app/profile/model/profile-interface';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import {
  setClientGalleryBackImage,
  setClientGalleryFrontImage,
  setClientGallerySideImage,
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
import { DataUrl, NgxImageCompressService } from 'ngx-image-compress';
import {
  ClientPhysicalDetails,
  ClientProfile,
} from '@/app/profile/model/clientProfile.model';
import { getClientProfile } from '@/app/profile/store/profile.selector';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService implements OnDestroy {
  private _percentageSource = new BehaviorSubject<number>(0);
  private percentage$ = this._percentageSource.asObservable();
  private imageForDb: UserImage;
  clientProfile: ClientProfile;
  clientProfileSub: Subscription;

  constructor(
    private storage: AngularFireStorage,
    private firestore: Firestore,
    private store: Store<AppState>,
    private imageCompress: NgxImageCompressService,
    public dialog: MatDialog
  ) {
    this.clientProfileSub = this.store
      .select(getClientProfile)
      .subscribe((clientProfile) => {
        this.clientProfile = clientProfile;
        console.log('clientProfileSub', clientProfile);
      });
  }

  compressImageBeforeUpload(
    ratio: number,
    quality: number,
    maxWidth: number,
    maxHeight: number,
    id: string,
    imageName: string,
    typeOfUploadImage: TypeOfUploadImage,
    folder: CollectionsType
  ) {
    return this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imageCompress
        .compressFile(image, orientation, ratio, quality, maxWidth, maxHeight)
        .then((result: DataUrl) => {
          // this.store.dispatch(setLoadingSpinner({ status: true }));
          const split = result.split(',');
          const type = split[0].replace('data:', '').replace(';base64', '');
          const byteString = atob(split[1]);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i += 1) {
            ia[i] = byteString.charCodeAt(i);
          }
          const fileBlob = new Blob([arrayBuffer], { type });
          console.log('fileBlob', fileBlob);
          console.log('this.clientProfile startUpload', this.clientProfile);
          if (this.clientProfile) {
            this.startUpload(
              fileBlob,
              id,
              imageName,
              typeOfUploadImage,
              folder,
              this.clientProfile.currentPhysicalDetails?.clientGalleryFront,
              this.clientProfile.currentPhysicalDetails?.clientGallerySide,
              this.clientProfile.currentPhysicalDetails?.clientGalleryBack
            );
          } else {
            this.startUpload(
              fileBlob,
              id,
              imageName,
              typeOfUploadImage,
              folder
            );
          }
        });
    });
  }

  public startUpload(
    image: Blob,
    id: string,
    imageName: string,
    typeOfImage: TypeOfUploadImage,
    folder: CollectionsType,
    clientGalleryFront?: UserImage,
    clientGallerySide?: UserImage,
    clientGalleryBack?: UserImage
  ) {
    const storage = getStorage();

    const day = new Date().getUTCDate();
    const month = new Date().getUTCMonth() + 1;
    const year = new Date().getUTCFullYear();

    // The storage path
    let path;
    if (typeOfImage === TypeOfUploadImage.ClientGallery) {
      path = `${id}/history/${day}-${month}-${year}/${imageName}`;
    } else {
      path = `${id}/${imageName}`;
    }

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
          console.log('typeOfImage', typeOfImage);
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
            case TypeOfUploadImage.ClientGallery: {
              console.log('imageName', imageName);
              if (imageName === UserImageType.clientGalleryFront) {
                updateDoc(refDb, {
                  currentPhysicalDetails: {
                    clientGalleryFront: {
                      downloadURL: downloadURL,
                      path,
                    },
                    clientGallerySide: {
                      ...clientGallerySide,
                    },
                    clientGalleryBack: {
                      ...clientGalleryBack,
                    },
                  },
                });

                this.store.dispatch(
                  setClientGalleryFrontImage({
                    galleryFrontImage: this.imageForDb,
                  })
                );
                break;
              } else if (imageName === UserImageType.clientGallerySide) {
                updateDoc(refDb, {
                  currentPhysicalDetails: {
                    clientGalleryFront: {
                      ...clientGalleryFront,
                    },
                    clientGallerySide: {
                      downloadURL: downloadURL,
                      path,
                    },
                    clientGalleryBack: {
                      ...clientGalleryBack,
                    },
                  },
                });

                this.store.dispatch(
                  setClientGallerySideImage({
                    gallerySideImage: this.imageForDb,
                  })
                );
                break;
              } else if (imageName === UserImageType.clientGalleryBack) {
                updateDoc(refDb, {
                  currentPhysicalDetails: {
                    clientGalleryFront: {
                      ...clientGalleryFront,
                    },
                    clientGallerySide: {
                      ...clientGallerySide,
                    },
                    clientGalleryBack: {
                      downloadURL: downloadURL,
                      path,
                    },
                  },
                });

                this.store.dispatch(
                  setClientGalleryBackImage({
                    galleryBackImage: this.imageForDb,
                  })
                );
                break;
              }
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

  ngOnDestroy() {
    if (this.clientProfileSub) {
      this.clientProfileSub.unsubscribe();
    }
  }
}
