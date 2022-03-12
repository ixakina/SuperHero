import {environment} from "../environments/environment";

export const apiUrl = `https://superheroapi.com/api.php/${environment.apiKey}`;

export enum LocStorKeys {
  CURRENT_USER_ID = 'currentUserId',
  USERS = 'users'
}
