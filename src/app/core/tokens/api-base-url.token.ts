import { createInjectionToken } from 'ngxtension/create-injection-token';
import { environment } from '../../../environments/environment';

function baseUrlFactory() {
  return environment.baseUrl;
}

export const [injectBaseUrl] = createInjectionToken(baseUrlFactory);
