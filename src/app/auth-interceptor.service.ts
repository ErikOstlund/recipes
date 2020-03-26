import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    // this takes 2 params: a request and a forwarding (next): so it can continue
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Request is on the way!");
        console.log('Request URL: ', req.url);

        // can modify the request. But it is immutable so to modify it, do this:
        const modifiedRequest = req.clone(
            {
                // url: 'some new url',
                headers: req.headers.append('Auth', 'abc')
            }
        );
        return next.handle(modifiedRequest);
    }
}