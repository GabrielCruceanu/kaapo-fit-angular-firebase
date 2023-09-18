import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  CollectionsType,
  UserImage,
  UserImageType,
  UserType,
} from '@/app/profile/model/profile-interface';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import {
  setGalleryBackImage,
  setGalleryFrontImage,
  setGallerySideImage,
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
import { ClientProfile } from '@/app/profile/model/clientProfile.model';
import { getClientProfile } from '@/app/profile/store/profile.selector';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';
import { NutritionistProfile } from '@/app/profile/model/nutritionistProfile.model';
import { GymProfile } from '@/app/profile/model/gym.model';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService implements OnDestroy {
  clientProfile: ClientProfile;
  clientProfileSub: Subscription;
  private _percentageSource = new BehaviorSubject<number>(0);
  private percentage$ = this._percentageSource.asObservable();
  private imageForDb: UserImage;

  constructor(
    private store: Store<AppState>,
    private imageCompress: NgxImageCompressService,
    public dialog: MatDialog
  ) {
    this.clientProfileSub = this.store
      .select(getClientProfile)
      .subscribe((clientProfile) => {
        this.clientProfile = clientProfile;
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
    folder: CollectionsType,
    currentUserProfile?: ClientProfile | TrainerProfile | NutritionistProfile,
    imageProfile?:
      | ClientProfile
      | TrainerProfile
      | NutritionistProfile
      | GymProfile
  ) {
    return this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imageCompress
        .compressFile(image, orientation, ratio, quality, maxWidth, maxHeight)
        .then((result: DataUrl) => {
          this.store.dispatch(setLoadingSpinner({ status: true }));
          const split = result.split(',');
          const type = split[0].replace('data:', '').replace(';base64', '');
          const byteString = atob(split[1]);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i += 1) {
            ia[i] = byteString.charCodeAt(i);
          }
          const fileBlob = new Blob([arrayBuffer], { type });

          if (currentUserProfile) {
            console.log(
              'compressImageBeforeUpload > currentUserProfile',
              currentUserProfile
            );
            this.startUpload(
              fileBlob,
              id,
              imageName,
              typeOfUploadImage,
              folder,
              currentUserProfile
            );
          } else if (imageProfile) {
            this.startUpload(
              fileBlob,
              id,
              imageName,
              typeOfUploadImage,
              folder,
              undefined,
              imageProfile
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
    currentUserProfile?: ClientProfile | TrainerProfile | NutritionistProfile,
    imageProfile?:
      | ClientProfile
      | TrainerProfile
      | NutritionistProfile
      | GymProfile
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
          // const refDb = doc(this.firestore, folder, id);

          this.imageForDb = {
            downloadURL: downloadURL,
            path,
          };

          switch (typeOfImage) {
            case TypeOfUploadImage.Profile: {
              // updateDoc(refDb, {
              //   profileImage: {
              //     downloadURL: downloadURL,
              //     path,
              //   },
              // });
              if (imageProfile.status === UserType.Client) {
                // const clientDb = doc(this.firestore, 'clients', id);
                // updateDoc(clientDb, {
                //   ...imageProfile,
                //   profilePicture: {
                //     downloadURL: downloadURL,
                //     path,
                //   },
                // });
              } else if (imageProfile.status === UserType.Trainer) {
                // const clientDb = doc(this.firestore, 'trainers', id);
                // updateDoc(clientDb, {
                //   ...imageProfile,
                //   profilePicture: {
                //     downloadURL: downloadURL,
                //     path,
                //   },
                // });
              } else if (imageProfile.status === UserType.Nutritionist) {
                /* const clientDb = doc(this.firestore, 'nutritionists', id);
              updateDoc(clientDb, {
                ...imageProfile,
                profilePicture: {
                  downloadURL: downloadURL,
                  path,
                },
              });*/
              } else if (imageProfile.status === UserType.Gym) {
                // const clientDb = doc(this.firestore, 'gyms', id);
                // updateDoc(clientDb, {
                //   ...imageProfile,
                //   profilePicture: {
                //     downloadURL: downloadURL,
                //     path,
                //   },
                // });
              }
              this.store.dispatch(
                setUserProfileImage({ profileImage: this.imageForDb })
              );
              break;
            }
            case TypeOfUploadImage.Cover: {
              // updateDoc(refDb, {
              //   coverImage: {
              //     downloadURL: downloadURL,
              //     path,
              //   },
              // });
              if (imageProfile.status === UserType.Client) {
                // const clientDb = doc(this.firestore, 'clients', id);
                // updateDoc(clientDb, {
                //   ...imageProfile,
                //   coverPicture: {
                //     downloadURL: downloadURL,
                //     path,
                //   },
                // });
              } else if (imageProfile.status === UserType.Trainer) {
                // const clientDb = doc(this.firestore, 'trainers', id);
                // updateDoc(clientDb, {
                //   ...imageProfile,
                //   coverPicture: {
                //     downloadURL: downloadURL,
                //     path,
                //   },
                // });
              } else if (imageProfile.status === UserType.Nutritionist) {
                // const clientDb = doc(this.firestore, 'nutritionists', id);
                // updateDoc(clientDb, {
                //   ...imageProfile,
                //   coverPicture: {
                //     downloadURL: downloadURL,
                //     path,
                //   },
                // });
              } else if (imageProfile.status === UserType.Gym) {
                // const clientDb = doc(this.firestore, 'gyms', id);
                // updateDoc(clientDb, {
                //   ...imageProfile,
                //   coverPicture: {
                //     downloadURL: downloadURL,
                //     path,
                //   },
                // });
              }
              this.store.dispatch(
                setUserCoverImage({ coverImage: this.imageForDb })
              );
              break;
            }
            case TypeOfUploadImage.ClientGallery: {
              if (imageName === UserImageType.clientGalleryFront) {
                // updateDoc(refDb, {
                //   currentPhysicalDetails: {
                //     ...currentUserProfile.currentPhysicalDetails,
                //     clientGalleryFront: {
                //       downloadURL: downloadURL,
                //       path,
                //     },
                //   },
                // });

                this.store.dispatch(
                  setGalleryFrontImage({
                    galleryFrontImage: this.imageForDb,
                  })
                );
                break;
              } else if (imageName === UserImageType.clientGallerySide) {
                // updateDoc(refDb, {
                //   currentPhysicalDetails: {
                //     ...currentUserProfile.currentPhysicalDetails,
                //     clientGallerySide: {
                //       downloadURL: downloadURL,
                //       path,
                //     },
                //   },
                // });

                this.store.dispatch(
                  setGallerySideImage({
                    gallerySideImage: this.imageForDb,
                  })
                );
                break;
              } else if (imageName === UserImageType.clientGalleryBack) {
                // updateDoc(refDb, {
                //   currentPhysicalDetails: {
                //     ...currentUserProfile.currentPhysicalDetails,
                //     clientGalleryBack: {
                //       downloadURL: downloadURL,
                //       path,
                //     },
                //   },
                // });

                this.store.dispatch(
                  setGalleryBackImage({
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
