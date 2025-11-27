import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';
import { logger } from '@/helpers/logger/pino';

@Interceptor()
export class ResponseMappingMiddleware implements InterceptorInterface {
  intercept(action: Action, result: any) {
    logger.info({
      name: action.request.method,
      message: action.request.url,
      result: result,
    });
    return {
      success: true,
      data: result,
    };
  }
}
