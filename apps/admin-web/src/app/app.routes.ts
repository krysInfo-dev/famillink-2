import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard';
import { Login } from './presentation/auth/pages/login/login';
import { NotFound } from './shared/components/errors/not-found/not-found';
import { ServerError } from './shared/components/errors/server-error/server-error';
import { NewsList } from './presentation/news/pages/list/news-list';
import { MembersList } from './presentation/members/pages/list/members-list';
import { UsersList } from './presentation/users/pages/list/users-list';
import { Main } from './shared/pages/main/main';
import { Logout } from './presentation/auth/pages/logout/logout';
import { ForgetPassword } from './presentation/auth/pages/forget-password/forget-password';
import { ResetPassword } from './presentation/auth/pages/reset-password/reset-password';

export const appRoutes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      { path: '', redirectTo: 'news/news-list', pathMatch: 'full' },
      { path: 'news/news-list', component: NewsList, canActivate: [AuthGuard], },
      { path: 'member/member-list', component: MembersList, canActivate: [AuthGuard], },
      { path: 'user/user-list', component: UsersList, canActivate: [AuthGuard], },
    ]
  },
  { path: 'auth/login', component: Login },
  { path: 'auth/logout', component: Logout },
  { path: 'auth/forget-password', component: ForgetPassword },
  { path: 'auth/reset-password/:token/:userId', component: ResetPassword },
  { path: 'not-found', component: NotFound },
  { path: 'server-error', component: ServerError },
  { path: '**', redirectTo: '/not-found' }
];
