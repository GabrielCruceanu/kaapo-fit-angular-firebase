import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  public static getCloudinaryUploadURL(): string {
    return environment.cloudinaryUploadURL;
  }

  public static getCloudinaryDownloadURL(): string {
    return environment.cloudinaryDownloadURL;
  }

  public static getCloudinaryConfig() {
    return environment.cloudinaryConfig;
  }
}
