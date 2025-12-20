import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
// Im using this flow to improvise loading and etc on the frontend
export class DelayInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const delayTime = Math.floor(Math.random() * 1000) + 2000;
    return next.handle().pipe(delay(delayTime));
  }
}
