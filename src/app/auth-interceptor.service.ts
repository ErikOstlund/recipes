import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    // this takes 2 params: a request and a forwarding (next): so it can continue
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Request is on the way!");
        return next.handle(req);
    }
}