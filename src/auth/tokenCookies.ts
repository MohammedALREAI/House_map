import cookies from 'js-cookie'



interface ITokenOperation {
     getCookie: () => string | undefined,
     setCookie: (token:string) => string | undefined,
     removeCookie: () => void,
}

export const TokenOperation: ITokenOperation = {
     getCookie : () => cookies.get('token'),
     removeCookie : () => cookies.remove('token'),
     setCookie : (token: string) => 
     cookies.set('token', token, {
               expires: 1 / 24
          })
     }

