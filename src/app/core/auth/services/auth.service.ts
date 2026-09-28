import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { MY_TOKEN } from '../../../core/tokens/app-config.token';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { RegisterReq, RegisterRes } from '../models/register.interface';
import { LoginReq } from '../models/login.interface';
import { ResetCode } from '../models/verify-reset-code.interface';
import { ChangePasswordReq } from '../models/change-password.interface';
import { EditProfile, ProfileData, UploadPhoto, User } from '../models/profile-data.interface';
import { ForgotPasswordReq } from '../models/forgot-password.interface';
import { ResetPassword } from '../models/reset-password.interface';
import { CookieService } from 'ngx-cookie-service';

@Service()
export class AuthService {

    private readonly _httpClient = inject(HttpClient)
    private readonly api = inject(MY_TOKEN)
    private readonly TOKEN_KEY = 'token';
    private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
    private readonly cookieService = inject(CookieService);

    readonly currentUser$ = this.currentUserSubject.asObservable();
    readonly isAuthenticated$ = this.currentUser$.pipe(map(user => !!user));

    login(data: LoginReq): Observable<RegisterRes> {
        return this._httpClient.post<RegisterRes>(this.api + '/auth/signin', data).pipe(
            tap(res => {
                this.handleAuthentication(res);
            })
        )
    }

    register(data: RegisterReq): Observable<RegisterRes> {
        return this._httpClient.post<RegisterRes>(this.api + '/auth/signup', data)
    }

    forgotPassword(data: ForgotPasswordReq): Observable<{}> {
        return this._httpClient.post<{}>(this.api + '/auth/forgotPassword', data)
    }

    verifyResetCode(code: ResetCode): Observable<{}> {
        return this._httpClient.post<{}>(this.api + '/auth/verifyResetCode', code)
    }

    resetPassword(data: ResetPassword): Observable<{}> {
        return this._httpClient.put<{}>(this.api + '/auth/resetPassword', data)
    }

    changePassword(data: ChangePasswordReq): Observable<{}> {
        return this._httpClient.patch<{}>(this.api + '/auth/change-password', data)
    }


    getProfileData(): Observable<ProfileData> {
        return this._httpClient.get<ProfileData>(this.api + '/auth/profile-data').pipe(
            tap(response => {
                this.currentUserSubject.next(response.user);
            })
        );
    }

    updateProfileData(data: EditProfile): Observable<ProfileData> {
        return this._httpClient.put<ProfileData>(this.api + '/auth/editProfile', data).pipe(
            tap(response => {
                this.currentUserSubject.next(response.user);
            })
        );
    }

    uploadProfilePhoto(data: UploadPhoto): Observable<{}> {
        return this._httpClient.put<{}>(this.api + '/auth/upload-photo', data)
    }

    deleteMe(): Observable<{}> {
        return this._httpClient.delete<{}>(this.api + '/auth/deleteMe').pipe(
            tap(() => {
                this.clearAuthentication();
            })
        );
    }

    logout(): Observable<{}> {
        return this._httpClient.get(this.api + '/auth/logout').pipe(
            tap(() => {
                this.clearAuthentication();
            })
        );
    }

    private handleAuthentication(response: RegisterRes): void {
        this.cookieService.set(this.TOKEN_KEY, response.token);
        this.currentUserSubject.next(response.user);
    }

    private clearAuthentication(): void {
        this.cookieService.delete(this.TOKEN_KEY);
        this.currentUserSubject.next(null);
    }

    getToken() {
        return this.cookieService.get(this.TOKEN_KEY)
    }
}
