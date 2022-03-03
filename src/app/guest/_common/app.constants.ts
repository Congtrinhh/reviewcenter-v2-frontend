import { environment } from 'src/environments/environment';

export class AppConstants {
  private static API_BASE_URL = environment.apiBaseUrl;

  private static OAUTH2_URL =
    AppConstants.API_BASE_URL + 'oauth2/authorization/';

  private static REDIRECT_URL = environment.oAuth2RedirectUrl;

  public static API_URL = AppConstants.API_BASE_URL + 'api/';
  public static AUTH_API = AppConstants.API_URL + 'auth/';

  public static GOOGLE_AUTH_URL =
    AppConstants.OAUTH2_URL + 'google' + AppConstants.REDIRECT_URL;
  public static FACEBOOK_AUTH_URL =
    AppConstants.OAUTH2_URL + 'facebook' + AppConstants.REDIRECT_URL;
  public static GITHUB_AUTH_URL =
    AppConstants.OAUTH2_URL + 'github' + AppConstants.REDIRECT_URL;
  public static LINKEDIN_AUTH_URL =
    AppConstants.OAUTH2_URL + 'linkedin' + AppConstants.REDIRECT_URL;

  public static API_ADMIN_BASE_URL = AppConstants.API_URL + 'admin/';

  public static PAGE_SIZES_ADMIN = [5, 10, 15, 20, 30, 50];

  public static BASE64_IMG_PREFIX = 'data:image/png;base64,';

  public static PERMITTED_IMG_EXTENSIONS = ['jpg', 'png', 'jpeg'];

  public static PAGE_SIZE_USER = 10;
}
