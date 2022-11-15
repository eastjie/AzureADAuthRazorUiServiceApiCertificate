import { DirectApiCallComponent } from './directApiCall/directApiCall.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule, OidcConfigService, LogLevel } from 'angular-auth-oidc-client';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { GraphApiCallComponent } from './graphApiCall/graphApiCall.component';
import { ApplicationApiCallComponent } from './applicationApiCall/applicationApiCall.component';
import { DelegatedApiCallComponent } from './delegatedApiCall/delegatedApiCall.component';
import { AuthorizationGuard } from './authorization.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    UnauthorizedComponent,
    DirectApiCallComponent,
    GraphApiCallComponent,
    ApplicationApiCallComponent,
    DelegatedApiCallComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'directApiCall', component: DirectApiCallComponent, canActivate: [AuthorizationGuard] },
    { path: 'graphApiCall', component: GraphApiCallComponent, canActivate: [AuthorizationGuard] },
    { path: 'applicationApiCall', component: ApplicationApiCallComponent, canActivate: [AuthorizationGuard] },
    { path: 'delegatedApiCall', component: DelegatedApiCallComponent, canActivate: [AuthorizationGuard] },
    { path: 'unauthorized', component: UnauthorizedComponent },
  ], { relativeLinkResolution: 'legacy' }),
  AuthModule.forRoot({
    config: {
      authority: 'https://login.microsoftonline.com/574e2370-5ce2-4577-aaf9-436dc0ea6656/v2.0',
      authWellknownEndpointUrl: 'https://login.microsoftonline.com/574e2370-5ce2-4577-aaf9-436dc0ea6656/v2.0',
      redirectUrl: window.location.origin,
      clientId: '023c584e-d58f-4700-bc1f-1f1c6e1bf2f2',
      scope: 'openid profile email https://sandboxb2ctesting.onmicrosoft.com/73a141b6-7f79-4103-831b-be53d2766a19/access_as_user offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      maxIdTokenIatOffsetAllowedInSeconds: 600,
      issValidationOff: false,
      autoUserInfo: false,
      logLevel: LogLevel.Debug
    },
  }),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthorizationGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
