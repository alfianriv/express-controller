import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';

@Interceptor()
export class ResponseMappingMiddleware implements InterceptorInterface {
    intercept(action: Action, result: any) {
        return {
            success: true,
            data: result,
        };
    }
}